#!/usr/bin/env bash
set -Eeuo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo' >&2; exit 1; }
exec 9>/var/lock/react-secret-deploy.lock
flock -n 9 || { echo 'Another deployment is running' >&2; exit 1; }
root=/opt/react-secret/docker
test -L "$root/current"
test -L "$root/previous"
current=$(readlink -f "$root/current")
previous=$(readlink -f "$root/previous")
test -f "$current/compose.yaml"
test -f "$previous/compose.yaml"
compose() { docker compose --project-directory "$1" -f "$1/compose.yaml" --env-file "$1/.env" "${@:2}"; }
if ! compose "$previous" up -d --wait --wait-timeout 90; then
  compose "$current" up -d --wait --wait-timeout 90
  exit 1
fi
ln -sfn "$previous" "$root/current.next"
mv -Tf "$root/current.next" "$root/current"
ln -sfn "$current" "$root/previous"
echo 'Previous Docker release restored'
