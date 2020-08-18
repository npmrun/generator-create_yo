// 用户输入选择，用于之后的文件限制输出
const inputProjectName = {
    type: 'input',
    name: 'name',
    message: '请输入您的yo名称',
    default: '',
    validate(value) {
        if (value == "") {
            return false;
        }
        return true;
    }
};

const chooseType = {
    type: "checkbox",
    message: "选择安装类型:",
    name: "install",
    choices: [
        {
            name: "npm",
            checked: true // 默认选中
        },
        {
            name: "bower",
        },
        {
            name: "yarn"
        }
    ]
};

module.exports = (yo) => {
    return (async function () {
        let arr= []
        if (!this._data.projectName) {
            arr.push(inputProjectName)
        }
        arr.push(chooseType)
        this.answers = await this.prompt(arr);
        if (this.answers.name) {
            this._data.projectName = this.answers.name
        }
    }).apply(yo);
};