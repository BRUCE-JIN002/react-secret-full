#!/usr/bin/env bash
# Run as root. Only Docker services are updated; host Nginx routes are managed separately.
set -Eeuo pipefail
release=${1:?Usage: release.sh RELEASE_ID BUNDLE_DIRECTORY}
bundle=${2:?Bundle directory is required}
[[ $release =~ ^[0-9a-f]{40}-[0-9]+-[0-9]+$ ]] || { echo 'Invalid release ID' >&2; exit 1; }
[[ $EUID == 0 ]] || { echo 'Run with sudo' >&2; exit 1; }
exec 9>/var/lock/react-secret-deploy.lock
flock -n 9 || { echo 'Another deployment is running' >&2; exit 1; }
root=/opt/react-secret/docker
mkdir -p "$root/releases"
test -f /etc/react-secret/ai.env
cd "$bundle"
sha256sum -c images.tar.gz.sha256
docker load -i images.tar.gz
target="$root/releases/$release"
test ! -e "$target"
mkdir "$target"
cp compose.yaml "$target/compose.yaml"
printf 'RELEASE_ID=%s\n' "$release" > "$target/.env"
previous=''
if [[ -L "$root/current" ]]; then previous=$(readlink -f "$root/current"); fi
compose() { docker compose --project-directory "$1" -f "$1/compose.yaml" --env-file "$1/.env" "${@:2}"; }
restore() {
  if [[ -n "$previous" && -f "$previous/compose.yaml" ]]; then
    compose "$previous" up -d --wait --wait-timeout 90
  else
    compose "$target" down
  fi
}
verify() {
  curl -fsS --max-time 10 http://127.0.0.1:18080/ >/dev/null &&
  curl -fsS --max-time 10 http://127.0.0.1:18080/ai-playground.html >/dev/null &&
  curl -fsS --max-time 10 http://127.0.0.1:15180/api/ai/status | python3 -c 'import json,sys; sys.exit(0 if json.load(sys.stdin).get("configured") else 1)'
}
if ! compose "$target" up -d --wait --wait-timeout 90 || ! verify; then
  echo 'Deployment check failed; restoring previous containers' >&2
  restore
  exit 1
fi
if [[ -n "$previous" ]]; then ln -sfn "$previous" "$root/previous"; fi
ln -sfn "$target" "$root/current.next"
mv -Tf "$root/current.next" "$root/current"
echo "Healthy Docker release: $release"
