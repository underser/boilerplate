# Boilerplate 
*Це стартовий шаблон, який включає в себе, найбільш популярні інструменти для front-end development-ту на 2016 рік*

**Для того щоб розпочати розробку нового проекту необхідно лише:**

```shell
	mkdir newProjectFolder
	cd newProjectFolder
	git clone --bare https://github.com/underser/boilerplate.git
	cd boilerplate.git
	git push --mirror 'link to new github repository'
	cd ..
	rm -rf boilerplate.git
```

### Devdependencies:
	> - node.js
	> - npm
	> - bower (global)
	> - gulp (global)

### NPM dependencies:
	|dependence           | version  |
	|----------:          | :-------: |
	|"gulp":              |  "^3.9.1"|
	|"gulp-autoprefixer": | "^3.1.0" |
	|"gulp-concat":       | "^2.6.0" |
	|"gulp-jade":         | "^1.1.0" |
	|"gulp-sass":         | "^2.2.0" |
	|"gulp-uglifyjs":     | "^0.6.2" |
