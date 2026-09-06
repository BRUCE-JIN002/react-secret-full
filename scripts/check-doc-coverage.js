#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.resolve(root, file), "utf8");
const parse = (file) => ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const manifest = JSON.parse(read("docs/examples/manifest.json"));
const menu = parse("src/menu/Menu.tsx");
const enumValues = new Map();
const pages = [];
function walk(node, visit) {
  visit(node);
  ts.forEachChild(node, (child) => walk(child, visit));
}
walk(menu, (node) => {
  if (ts.isEnumDeclaration(node)) {
    for (const member of node.members) {
      if (member.initializer && ts.isStringLiteral(member.initializer)) {
        enumValues.set(`${node.name.text}.${member.name.getText(menu)}`, member.initializer.text);
      }
    }
  }
  if (ts.isCallExpression(node) && node.expression.getText(menu) === "getItem" && node.arguments.length < 4) {
    pages.push(node.arguments[1].getText(menu));
  }
});
const hookFile = "src/constants/hookDisplayConfig.ts";
const hooks = parse(hookFile);
const hookImports = new Map();
const hookDocs = new Map();
walk(hooks, (node) => {
  if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.endsWith("/readme-content")) {
    const bindings = node.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const item of bindings.elements) {
        hookImports.set(item.name.text, path.resolve(root, path.dirname(hookFile), node.moduleSpecifier.text, "../README.md"));
      }
    }
  }
  if (ts.isPropertyAssignment(node) && ts.isComputedPropertyName(node.name) && ts.isObjectLiteralExpression(node.initializer)) {
    const doc = node.initializer.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText(hooks) === "doc");
    if (doc) hookDocs.set(node.name.expression.getText(hooks), doc.initializer.getText(hooks));
  }
});
for (const page of pages) {
  const key = enumValues.get(page);
  const filename = page.startsWith("HooksType.") ? hookImports.get(hookDocs.get(page)) : manifest[key]?.readme;
  if (!filename) throw new Error(`Missing documentation for ${page}`);
  const markdown = read(filename);
  if (!/^# .+/m.test(markdown) || !/^## .+/m.test(markdown)) throw new Error(`Incomplete documentation: ${filename}`);
}
for (const entry of Object.values(manifest)) {
  const markdown = read(entry.readme);
  for (const heading of ["交互指南", "在项目中运行", "API 与实现要点", "使用边界", "源码位置"]) {
    if (!markdown.includes(`## ${heading}`)) throw new Error(`Missing ${heading}: ${entry.readme}`);
  }
}
console.log(`Documentation coverage: ${pages.length}/${pages.length} navigation pages, ${Object.keys(manifest).length} new example documents.`);
