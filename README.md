# WSC 2024 codebase

## Install dependencies
Run the following command to install all dependencies:
```bash
yarn install
```

## Start the infrastructure
In a different terminal, run the following command to start the infrastructure:
```bash
yarn infra
```

## Start the application

### Effect example code
Run
```bash
yarn --silent sample
```
### Prepopulate MongoDB
To generate the data for the MongoDB, with 10 thousands animals and 100 thousand plants, run the following command:
```bash
yarn go generate
```

### Presentation code
Run
```bash
yarn go <step>
```
where `<step>` can be one of:
- `basic` for the async/await version
- `effect` for the basic effect version
- `concurrency` for the concurrency version
- `cached` for the concurrency+cached version
- `batched` for the concurrency+cached+batched version