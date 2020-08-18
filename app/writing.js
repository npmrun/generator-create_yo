// 在其中写入生成器特定文件（路由，控制器等）的位置
module.exports = (yo) => {
  return function () {
    const copyTpl = (input = "", output = "", placeholder = {}) => {
      this.fs.copyTpl(
        // 目标路径
        this.templatePath(input),
        // 生成的目标文件
        this.destinationPath(output),
        // 注入占位文本
        placeholder
      );
    };

    // 设置目标根路径，之后就不用改了，就一直是这个目标路径了
    this.destinationRoot(this._data.projectName);
    const placeholder = {
      ...this.answers,
      who:this._data.who
    };
    this.log(placeholder)
    copyTpl(".gitignore", ".gitignore",placeholder);
    copyTpl(".yo-rc.json", ".yo-rc.json",placeholder);
    copyTpl("", "", placeholder);
  }.apply(yo);
};
