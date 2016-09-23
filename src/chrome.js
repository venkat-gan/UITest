var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var Until = webdriver.until;
var base64 = require("base64-img");
var sleep = require("sleep");

const getBrowser = function (url) {
	//172.17.0.2
	var ipAddress = "127.0.0.1";
	if (process.env.GITLAB_CI == "true" || process.env.GITLAB_CI == true) {
		ipAddress = "172.17.0.2";
	}
	var driver = new webdriver.Builder().forBrowser('chrome').usingServer('http://'+ipAddress+':4444/wd/hub').build();
	driver.get(url).then(function (res) {
		console.log(res,"======");
	});
	var height = driver.executeScript("return screen.height;").then(function (res) {
		return res;
	});
	var width = driver.executeScript("return screen.width;").then(function (res) {
		return res;
	})
	driver.manage().window().setSize(1440,900);
	return driver;
}

const openUrl = function (driver,url) {
	driver.get(url).then(function () {
		sleep.sleep(5);
	});
}

const takeScreenshot = function (driver,folderName,fileName) {
	driver.takeScreenshot().then(function (res) {
		var filepath = base64.imgSync('data:image/png;base64,'+res,folderName,fileName);
	})
}

module.exports = {
	getBrowser,
	openUrl,
	takeScreenshot
}

// var driver = getBrowser("http://www.google.com");
// openUrl(driver,"http://www.zoho.com");
// takeScreenshot(driver,".","test")
// driver.quit();
