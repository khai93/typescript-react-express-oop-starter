const exec = require('child_process').execSync;

// Server Build
exec('npx tsc');

// Client Build

exec("cd ./src/client && yarn build");