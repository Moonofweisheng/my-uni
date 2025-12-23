import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const rootDir = process.cwd()
const rootPackagePath = resolve(rootDir, 'package.json')
const packages = ['@my-uni/router']

function syncVersions(): void {
  const rootPackage = JSON.parse(readFileSync(rootPackagePath, 'utf-8'))
  const rootVersion = rootPackage.version

  console.log(`Root version: ${rootVersion}`)
  console.log('Syncing versions to packages...\n')

  for (const pkgName of packages) {
    const packagePath = resolve(rootDir, 'packages', pkgName.replace('@my-uni/', ''), 'package.json')
    try {
      const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))

      if (pkg.version !== rootVersion) {
        pkg.version = rootVersion
        writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`)
        console.log(`✅ ${pkgName}: ${rootVersion}`)
      }
      else {
        console.log(`ℹ️  ${pkgName}: already at ${rootVersion}`)
      }
    }
    catch (error) {
      console.error(`❌ Error syncing ${pkgName}:`, error instanceof Error ? error.message : String(error))
    }
  }

  console.log('\n✅ Version sync completed!')
}

syncVersions()
