module.exports = {
  apps: [
    {
      name: "MAIN",
      namespace: "Erkal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Ana",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: "GUARDI",
      namespace: "Erkal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Guard_I",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: "GUARDII",
      namespace: "Erkal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Guard_II",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: "GUARDIII",
      namespace: "Erkal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Guard_III",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: "GUARDIV",
      namespace: "Erkal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Guard_IV",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: "INVITE",
      namespace: "Erkal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Invite",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    },
    {
      name: "STATS",
      namespace: "Erkal",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./BOTLAR/BOTS/Stats",
      output: '../../../Logger/[1]out.log',
      error: '../../../Logger/[2]error.log',
      log: '../../../Logger/[3]combined.outerr.log'
    }, 
  ]
};