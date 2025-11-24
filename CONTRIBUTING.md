# Contributing to React Native Scaffolding

👍🏽 First off, thank you for considering contributing!

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `pnpm install`
3. **Make your changes**
4. **Follow the code style**: Run `pnpm lint:fix` and `pnpm format`
5. **Test your changes**: Run `pnpm test`
6. **Update documentation** if needed
7. **Commit your changes** using clear commit messages
8. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/react-native-scaffolding.git

# Install dependencies
pnpm install

# Start development server
pnpm start
```

## Code Style

We use ESLint and Prettier to maintain code quality:

```bash
# Check linting
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Auto-format
pnpm format
```

### Commit Messages

We follow conventional commits:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Code style changes (formatting, missing semicolons, etc.)
- `refactor:` Code changes that neither fix a bug nor add a feature
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Changes to build process or auxiliary tools

Examples:
```
feat: add dark mode support
fix: resolve navigation crash on Android
docs: update installation instructions
```

## Project Structure

Please maintain the existing project structure:

```
src/
├── app/              # Expo Router pages
├── components/       # Reusable components
├── features/        # Feature modules
├── hooks/           # Custom hooks
├── lib/             # Library configurations
├── services/        # API services
├── utils/           # Utility functions
└── i18n/            # Internationalization
```

## Testing

- Write tests for new features
- Update tests when modifying existing code
- Ensure all tests pass before submitting PR

```bash
pnpm test
```

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments for new functions/components
- Update relevant documentation in `docs/`

## Questions?

Feel free to open an issue for questions or discussions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
