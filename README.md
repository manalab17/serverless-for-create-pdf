# serverless-for-create-pdf with korean font

This project is based on puppeteer-core and [@sparticuz/chromium](https://github.com/Sparticuz/chromium) :)

### Usage

*Optimized in AWS Lambda environment.*

> If you want using custom fonts, Please add font layer. (chromium doesn't support CJK fonts)
> https://github.com/Sparticuz/chromium?tab=readme-ov-file#fonts  
>   
> **Font layer zip file must have `/fonts/[fontfile]` and use .OTF files**  

1. Setup your AWS access key for deploy
1. Run `deploy` script

>*If you want keep deploy dependencies, Please use `serverless.yml`>`provider`>`runtimeManagement` option with your deployed lambda function's ARN*  
> https://www.serverless.com/framework/docs-providers-aws-guide-functions#runtime-management