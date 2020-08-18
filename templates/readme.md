# <%= who %>/generator-create_<%= name %>

```
npm install -g yo
npm install -g <%= who %>/generator-create_<%= name %>
yo create_<%= name %>
```

源文件放在`templates`中，会自动打包到目标文件夹

> 注意.开头的文件需要特别指定,如:`copyTpl(".gitignore", ".gitignore", placeholder);`