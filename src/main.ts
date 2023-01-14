import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
const PORT = process.env.PORT || 8000
async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
    .setTitle('NestJs I-ticket')
    .setDescription('REST API and AUTH')
    .setVersion('1.0.0')
    .addTag('NodeJs,NestJs,Postgres,sequelize')
    .build()

  
    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('api/docs',app,document)
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT,()=>{
      console.log(`Server running at ${PORT}`)
    });
  } catch (error) {
    throw new Error(error)
  }
}
start();