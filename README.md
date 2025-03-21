# Koffie interface

Just a simple interface to show stats!

## Requirements

Ensure you have the following installed:

- **Docker** - For containerization
- **Docker Compose** - For orchestrating multiple containers
- **Prettier** - Code formatter (recommended VS Code plugin)
- **Tailwind CSS IntelliSense** - VS Code plugin for Tailwind class suggestions and completions
- **TypeScript and JavaScript Language Features** - Bundled with VS Code; ensure it's enabled for optimal support

## Getting Started

To start the development server locally:

```bash
docker compose -f docker-compose.local.yml up
```

This command builds and launches the Nuxt development environment within Docker. Once started, you can access the project in your browser at [http://localhost:3000](http://localhost:3000).

## Additional Information

- **Hot Reloading**: The container is configured for hot reloading, allowing code changes to reflect instantly in your browser.
- **File Structure**: This boilerplate follows standard Nuxt 4 conventions, making it easy to expand and customize.
- **VS Code Integration**: We recommend using the Prettier and Tailwind CSS IntelliSense plugins for a smoother development experience.
- **Nuxt Plugins**: The boilerplate includes useful Nuxt plugins by default, such as VueUse, NuxtIcon, NuxtFonts, and Tailwind CSS.

## Stopping the Development Environment

To stop and remove the running containers:

```bash
docker compose -f docker-compose.local.yml down
```

## Troubleshooting

If you encounter any issues, try rebuilding the containers:

```bash
docker compose -f docker-compose.local.yml up --build
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the setup.
