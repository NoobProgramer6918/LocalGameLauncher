# Branch Convention

This project uses a simple two-stage flow:

```text
{issue/feature branch} -> dev -> master
```

- **`master`** — production-ready code. Always stable and buildable (`npm run build && npm run start` should work). Releases/distribution builds are cut from here.
- **`dev`** — integration branch. All work is merged here first. When `dev` is stable and ready for release, it is merged into `master`.
- **`*-issue` / `*-feature` branches** — short-lived branches off `dev`, one per issue or feature. Merged back into `dev` (never directly into `master`) and deleted after merging.

## Naming

No prefixes like `issue/` or `feature/`. Instead, name branches as a short sentence describing what the branch does, ending with its **purpose**:

```text
<what-you-did>-<subject>-<purpose>
```

| Type        | Format                        | Examples                                                                               |
|-------------|-------------------------------|----------------------------------------------------------------------------------------|
| Feature     | `implement-<thing>-feature`   | `implement-settings-page-feature`                                                      |
| Improvement | `improve-<thing>-improvement` | `improve-library-scan-improvement`                                                     |
| Bug fix     | `fix-<thing>-bugfix`          | `fix-webpack-css-output-bugfix`                                                        |
| Release     | `prepare-<version>-release`   | `prepare-v0.3.0-release`                                                               |
| Hotfix      | `fix-<thing>-hotfix`          | `fix-crash-on-launch-hotfix` (rare, off `master`, merged into both `master` and `dev`) |

Rules:

- Lowercase, words separated by hyphens, no spaces.
- The purpose is recommended to go at the end of the branch name (`-feature`, `-bugfix`, `-improvement`, `-release`, `-hotfix`).
- Keep names short but descriptive — reading the branch name should tell you both what it does and why it exists.

## Workflow

1. **Start work from `dev`** (many repos alias `git sw` for `git switch`):
   ```bash
   git switch dev && git pull
   git switch -c <fix-example-issue>
   ```
   Tip: if `dev` is already up to date, you can create the branch in one command:
   ```bash
   git switch -c <fix-example-issue> dev
   ```
2. **Commit and push** to the same branch (`git push -u origin implement-settings-page-feature`).
3. **Merge into `dev`** when the work is done (open a PR or merge locally). Prefer `--no-ff` so the branch history is visible:
   ```bash
   git checkout dev
   git merge --no-ff <fix-example-issue>
   git push origin dev
   ```
   Delete the branch after merging:
   ```bash
   git branch -d <fix-example-issue>
   git push origin --delete <fix-example-issue>
   ```
4. **Promote `dev` to `master`** when the accumulated work is ready for release:
   ```bash
   git checkout master
   git merge --no-ff dev
   git push origin master
   ```
   When the merge contains non-documentation changes (anything beyond docs/README/comments), it is **expected to be tagged** before pushing:
   ```bash
   git tag vX.Y.Z
   git push origin master --tags
   ```
    - Tags follow semantic versioning: `vMAJOR.MINOR.PATCH` (e.g. `v0.3.0`). Bump PATCH for bugfixes, MINOR for features, MAJOR for big feature sets, redesigns, breaking changes and similar.
    - Documentation-only merges don't need a tag.
    - CI/CD picks up the tag and attaches the release artifacts — a Linux **AppImage** plus Windows **portable/installer** builds — to the GitHub release.
5. **Keep `master` and `dev` in sync.** Never commit straight to `master` except for critical hotfixes; hotfixes must also be merged back into `dev` so the fix isn't lost.

## Roles at a glance

| Action                  | Branch off | Merge into             |
| ------------------------| ---------- | ---------------------- |
| New feature/improvement | `dev`      | `dev`                  |
| Release preparation     | `dev`      | `master`               |
| Critical hotfix         | `master`   | `master` **and** `dev` |

**TL;DR:** Name branches `<what>-<subject>-<purpose>` (e.g. `implement-settings-page-feature`), branch off `dev` and make a branch → merge to `dev` → periodically merge `dev` to `master`.
