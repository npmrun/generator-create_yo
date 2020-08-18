// 依赖安装阶段
module.exports = ((yo) => {
  return (function () {
    // 只用npm
    this.installDependencies({
      npm: <%= install.includes('npm') %>,
      bower: <%= install.includes('bower') %>,
      yarn: <%= install.includes('yarn') %>,
    });
  }).apply(yo);
})