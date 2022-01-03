import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get("/")
  @Render('index')
  index() {
    return { 
      title: "Home Page - Online Store"
    };
  }

  @Get("/about")
  @Render('about')
  about() {
    let viewData = [];
    viewData["description"] = "This is an about page ...";
    viewData["author"] = "Developed by: Your Name";
    return { 
      title: "About us - Online Store",
      subtitle: "About us",
      viewData: viewData
    };
  }
}
