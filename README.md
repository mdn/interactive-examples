# interactive-examples

> [!WARNING]
> This repository is in the process of being **archived**!
>
> New pull requests will be closed, so do not work on issues or tasks relating to this repository to avoid lost time and work.
> For more information, see <https://github.com/orgs/mdn/discussions/782>.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Home of the [MDN](https://developer.mozilla.org/) interactive code examples.

## Project maintainers

Should you have any questions regarding this project, please feel free to @mention either @wbamberg, @bsmth or @NiedziolkaMichal.

## Good first issues

Want to contribute to the interactive examples project? Here are a couple of good first issues to get you started. Thanks!

[Good first issues](https://github.com/mdn/interactive-examples/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22example+needed%22+no%3Aassignee)

## Folder structure

- [css] - This contains the CSS used by the base templates.
- [js] - This contains the JS used by the base templates.
- [live-examples] - This contains the live example CSS and JS fragments.
- [media] - This contains images used by the live examples and templates.
- [tmpl] - The base templates.

The dynamically generated pages, their dependencies, and assets are generated to the `prod` branch.

## Browser support baseline

The following is a list of browser/version combinations supported by the interactive editor. In browsers that do not meet the criteria, the editor degrades gracefully to displaying static examples.

- Firefox - Latest three release versions.
- Chrome - Latest three release versions.
- Safari - Latest two release versions.
- Edge - Latest release version.

## Contributing

If you're interested in contributing to this project, great! Please see the [CONTRIBUTING](CONTRIBUTING.md) document.
