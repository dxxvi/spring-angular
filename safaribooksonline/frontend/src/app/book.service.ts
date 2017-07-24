import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Book } from "./model";

@Injectable() export class BookService {
  constructor(private http: Http) {
  }

  getBooks(): Promise<Book[]> {
    this.http.get('/books')
      .toPromise()
      .then(response => {
        const a = response.json();
        console.log('response for /books:');
        console.log(JSON.stringify(a));
        return a;
      });
    return Promise.resolve(
      [
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134120676/",
          "title": "Learning to Build iOS Apps with Swift: A Hands-On Guide to Swift App Development",
          "url": "https://www.safaribooksonline.com/library/view/learning-to-build/9780134120676/",
          "author": "Randy Scovil",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "December 2039"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491978221/",
          "title": "Natural Language Processing with PyTorch",
          "url": "https://www.safaribooksonline.com/library/view/natural-language-processing/9781491978221/",
          "author": "Goku Mohandas",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2018"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491980446/",
          "title": "TensorFlow for Deep Learning",
          "url": "https://www.safaribooksonline.com/library/view/tensorflow-for-deep/9781491980446/",
          "author": "Bharath Ramsundar",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "February 2018"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491954454/",
          "title": "MongoDB: The Definitive Guide, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/mongodb-the-definitive/9781491954454/",
          "author": "Shannon Bradshaw",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "February 2018"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781449342562/",
          "title": "AWS System Administration, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/aws-system-administration/9781449342562/",
          "author": "Federico Lucifredi",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "January 2018"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491933312/",
          "title": "Optimizing Java, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/optimizing-java-1st/9781491933312/",
          "author": "Benjamin J Evans",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "January 2018"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134122885/",
          "title": "Network Programming with Swift: Tools and Techniques to Create iOS and OS X Apps that Network",
          "url": "https://www.safaribooksonline.com/library/view/network-programming-with/9780134122885/",
          "author": "Karl Kowalski",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "January 2018"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788299183/",
          "title": "Cacti Beginner's Guide - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/cacti-beginners-guide/9781788299183/",
          "author": "Thomas Urban",
          "publisher": "Packt Publishing",
          "publishDate": "December 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491944233/",
          "title": "Learning Spark Streaming",
          "url": "https://www.safaribooksonline.com/library/view/learning-spark-streaming/9781491944233/",
          "author": "Gerard Maas",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "December 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491992463/",
          "title": "iOS 11 Swift Programming Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/ios-11-swift/9781491992463/",
          "author": "Vandad Nahavandipoor",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "December 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491974285/",
          "title": "Stream Processing with Apache Flink",
          "url": "https://www.safaribooksonline.com/library/view/stream-processing-with/9781491974285/",
          "author": "Vasiliki Kalavri",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "November 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134547046/",
          "title": "Pandas for Everyone: Python Data Analysis",
          "url": "https://www.safaribooksonline.com/library/view/pandas-for-everyone/9780134547046/",
          "author": "Daniel Y. Chen",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "November 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787282759/",
          "title": "Architecting the Industrial Internet",
          "url": "https://www.safaribooksonline.com/library/view/architecting-the-industrial/9781787282759/",
          "author": "Carla Romano",
          "publisher": "Packt Publishing",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787129054/",
          "title": "Modern R Programming Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/modern-r-programming/9781787129054/",
          "author": "Jaynal Abedin",
          "publisher": "Packt Publishing",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491961094/",
          "title": "Designing Products with Sound",
          "url": "https://www.safaribooksonline.com/library/view/designing-products-with/9781491961094/",
          "author": "Amber Case",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491961728/",
          "title": "Building Microservices with ASP.NET Core",
          "url": "https://www.safaribooksonline.com/library/view/building-microservices-with/9781491961728/",
          "author": "Kevin Hoffman",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491979891/",
          "title": "Machine Learning and Security",
          "url": "https://www.safaribooksonline.com/library/view/machine-learning-and/9781491979891/",
          "author": "David Freeman",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491923443/",
          "title": "Designing a UX Portfolio",
          "url": "https://www.safaribooksonline.com/library/view/designing-a-ux/9781491923443/",
          "author": "Ian Fenn",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491982266/",
          "title": "Product Management in Practice, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/product-management-in/9781491982266/",
          "author": "Matt LeMay",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491983638/",
          "title": "Designing Distributed Systems",
          "url": "https://www.safaribooksonline.com/library/view/designing-distributed-systems/9781491983638/",
          "author": "Brendan Burns",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491912201/",
          "title": "Spark: The Definitive Guide, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/spark-the-definitive/9781491912201/",
          "author": "Matei Zaharia",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491925935/",
          "title": "Database Reliability Engineering",
          "url": "https://www.safaribooksonline.com/library/view/database-reliability-engineering/9781491925935/",
          "author": "Laine Campbell",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491963401/",
          "title": "PostgreSQL: Up and Running, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/postgresql-up-and/9781491963401/",
          "author": "Leo S. Hsu",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "October 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515746/",
          "title": "International Journal of Rough Sets and Data Analysis (IJRSDA) Volume 4, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515746/",
          "author": "Nilanjan Dey",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515180/",
          "title": "International Journal of E-Planning Research (IJEPR) Volume 6, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515180/",
          "author": "Carlos Silva",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513568/",
          "title": "International Journal of Swarm Intelligence Research (IJSIR) Volume 8, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513568/",
          "author": "Yuhui Shi",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514343/",
          "title": "International Journal of Information Retrieval Research (IJIRR) Volume 7, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514343/",
          "author": "Zhongyu Lu",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511304/",
          "title": "International Journal of Technology and Human Interaction (IJTHI) Volume 13, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511304/",
          "author": "Chia-Wen Tsai",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512585/",
          "title": "International Journal of Decision Support System Technology (IJDSST) Volume 9, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512585/",
          "author": "Pascale Zaraté",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522510802/",
          "title": "Journal of Global Information Management (JGIM) Volume 25, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/journal-of-global/9781522510802/",
          "author": "Zuopeng Zhang",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515708/",
          "title": "International Journal of Public Administration in the Digital Age (IJPADA) Volume 4, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515708/",
          "author": "Manuel Pedro Rodríguez Bolívar",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513209/",
          "title": "International Journal of Applied Geospatial Research (IJAGR) Volume 8, Issue 4",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513209/",
          "author": "Donald Patrick Albert",
          "publisher": "IGI Global",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787282247/",
          "title": "Boost C++ Application Development Cookbook - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/boost-c-application/9781787282247/",
          "author": "Antony Polukhin",
          "publisher": "Packt Publishing",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134694849/",
          "title": "Core Java SE 9 for the Impatient, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/core-java-se/9780134694849/",
          "author": "Cay S. Horstmann",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491928363/",
          "title": "Augmented Human",
          "url": "https://www.safaribooksonline.com/library/view/augmented-human/9781491928363/",
          "author": "Helen Papagiannis",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491962831/",
          "title": "Network Security through Data Analysis, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/network-security-through/9781491962831/",
          "author": "Michael Collins",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491994276/",
          "title": "Presto Sketching",
          "url": "https://www.safaribooksonline.com/library/view/presto-sketching/9781491994276/",
          "author": "Ben Crothers",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491960745/",
          "title": "Automating Security in the Cloud",
          "url": "https://www.safaribooksonline.com/library/view/automating-security-in/9781491960745/",
          "author": "Ted Steffan",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491975022/",
          "title": "Collaborative Product Design, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/collaborative-product-design/9781491975022/",
          "author": "Austin Govella",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491975329/",
          "title": "bash Cookbook, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/bash-cookbook-2nd/9781491975329/",
          "author": "JP Vossen",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491969267/",
          "title": "Hadoop in the Enterprise: Architecture, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/hadoop-in-the/9781491969267/",
          "author": "Ian Buss",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491921968/",
          "title": "Using SVG with CSS3 and HTML5, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/using-svg-with/9781491921968/",
          "author": "Amelia Bellamy-Royds",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491957653/",
          "title": "Python for Data Analysis, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/python-for-data/9781491957653/",
          "author": "William Wesley McKinney",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491953136/",
          "title": "Designing for Happiness",
          "url": "https://www.safaribooksonline.com/library/view/designing-for-happiness/9781491953136/",
          "author": "Pamela Pavliscak",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491954232/",
          "title": "Designing Across Senses",
          "url": "https://www.safaribooksonline.com/library/view/designing-across-senses/9781491954232/",
          "author": "John Alderman",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134392318/",
          "title": "Sams Teach Yourself ASP.NET 5.0 in 24 Hours",
          "url": "https://www.safaribooksonline.com/library/view/sams-teach-yourself/9780134392318/",
          "author": "Jeffrey T. Fritz",
          "publisher": "Sams",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134123011/",
          "title": "Learn More Python 3 the Hard Way: The Next Step for New Python Programmers, 1/e",
          "url": "https://www.safaribooksonline.com/library/view/learn-more-python/9780134123011/",
          "author": "Zed A. Shaw",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "September 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787285798/",
          "title": "Emotional Intelligence for IT Professionals",
          "url": "https://www.safaribooksonline.com/library/view/emotional-intelligence-for/9781787285798/",
          "author": "Emília M. Ludovino",
          "publisher": "Packt Publishing",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491927175/",
          "title": "This Is Service Design Doing",
          "url": "https://www.safaribooksonline.com/library/view/this-is-service/9781491927175/",
          "author": "Marc Stickdorn",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781292148458/",
          "title": "The Little Book of Big Management Wisdom",
          "url": "https://www.safaribooksonline.com/library/view/the-little-book/9781292148458/",
          "author": "Dr. James McGrath",
          "publisher": "Pearson Business",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781632651044/",
          "title": "The Millenial Money Fix",
          "url": "https://www.safaribooksonline.com/library/view/the-millenial-money/9781632651044/",
          "author": "Boneparth Heather J",
          "publisher": "Career Press",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134579306/",
          "title": "More Effective C# (Covers C# 7.0) (Includes Content Update Program): 50 Specific Ways to Improve Your C#",
          "url": "https://www.safaribooksonline.com/library/view/more-effective-c/9780134579306/",
          "author": "Bill Wagner",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438213/",
          "title": "Mastering Import and Export Management, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/mastering-import-and/9780814438213/",
          "author": "Kelly Raia",
          "publisher": "AMACOM",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438695/",
          "title": "How Do I Get There from Here?",
          "url": "https://www.safaribooksonline.com/library/view/how-do-i/9780814438695/",
          "author": "George H. Schofield",
          "publisher": "AMACOM",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491965481/",
          "title": "Learning FPGAs, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/learning-fpgas-1st/9781491965481/",
          "author": "Justin Rajewski",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491972724/",
          "title": "Programming with MicroPython",
          "url": "https://www.safaribooksonline.com/library/view/programming-with-micropython/9781491972724/",
          "author": "Nicholas H. Tollervey",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491971710/",
          "title": "Product Roadmapping",
          "url": "https://www.safaribooksonline.com/library/view/product-roadmapping/9781491971710/",
          "author": "Michael Connors",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491944684/",
          "title": "Head First Agile, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/head-first-agile/9781491944684/",
          "author": "Jennifer Greene",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491959411/",
          "title": "Storytelling in Design",
          "url": "https://www.safaribooksonline.com/library/view/storytelling-in-design/9781491959411/",
          "author": "Anna Dahlström",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491997390/",
          "title": "Design for Living with Smart Products",
          "url": "https://www.safaribooksonline.com/library/view/design-for-living/9781491997390/",
          "author": "Simone Rebaudengo",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491987643/",
          "title": "C# 7.0 in a Nutshell",
          "url": "https://www.safaribooksonline.com/library/view/c-70-in/9781491987643/",
          "author": "Ben Albahari",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491974551/",
          "title": "Data Science on the Google Cloud Platform",
          "url": "https://www.safaribooksonline.com/library/view/data-science-on/9781491974551/",
          "author": "Valliappa Lakshmanan",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491973165/",
          "title": "Modern Java Recipes",
          "url": "https://www.safaribooksonline.com/library/view/modern-java-recipes/9781491973165/",
          "author": "Ken Kousen",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491921296/",
          "title": "Interactive Data Visualization for the Web, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/interactive-data-visualization/9781491921296/",
          "author": "Scott Murray",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491978504/",
          "title": "Learning TensorFlow",
          "url": "https://www.safaribooksonline.com/library/view/learning-tensorflow/9781491978504/",
          "author": "Tom Hope",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491935668/",
          "title": "Kubernetes: Up and Running",
          "url": "https://www.safaribooksonline.com/library/view/kubernetes-up-and/9781491935668/",
          "author": "Brendan Burns",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491927274/",
          "title": "Programming Rust",
          "url": "https://www.safaribooksonline.com/library/view/programming-rust/9781491927274/",
          "author": "Jason Orendorff",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491963036/",
          "title": "Applied Text Analysis with Python, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/applied-text-analysis/9781491963036/",
          "author": "Benjamin Bengfort",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491922927/",
          "title": "Elegant SciPy, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/elegant-scipy-1st/9781491922927/",
          "author": "Harriet Dashnow",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491974551/",
          "title": "Data Science on the Google Cloud Platform",
          "url": "https://www.safaribooksonline.com/library/view/data-science-on/9781491974551/",
          "author": "Valliappa Lakshmanan",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781523084630/",
          "title": "The Mood Elevator",
          "url": "https://www.safaribooksonline.com/library/view/the-mood-elevator/9781523084630/",
          "author": "Larry Senn",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119219033/",
          "title": "Rapid Organizational Change",
          "url": "https://www.safaribooksonline.com/library/view/rapid-organizational-change/9781119219033/",
          "author": "Steven Bleistein",
          "publisher": "John Wiley & Sons",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134269276/",
          "title": "Storage Design and Implementation in vSphere 6: A Technology Deep Dive, Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/storage-design-and/9780134269276/",
          "author": "Mostafa Khalil",
          "publisher": "VMware Press",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814437926/",
          "title": "Excuse Me",
          "url": "https://www.safaribooksonline.com/library/view/excuse-me/9780814437926/",
          "author": "Rosanne J. Thomas",
          "publisher": "AMACOM",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438527/",
          "title": "Succeeding with Senior Management",
          "url": "https://www.safaribooksonline.com/library/view/succeeding-with-senior/9780814438527/",
          "author": "G. Michael Campbell",
          "publisher": "AMACOM",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134680767/",
          "title": "Unreal Engine 4 for Design Visualization: Developing Stunning Interactive Visualizations, Animations, and Renderings",
          "url": "https://www.safaribooksonline.com/library/view/unreal-engine-4/9780134680767/",
          "author": "Tom Shannon",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134305462/",
          "title": "Troubleshooting Cisco IP Telephony and Video (CTCOLLAB) Foundation Learning Guide (CCNP Collaboration Exam 300-080 CTCOLLAB)",
          "url": "https://www.safaribooksonline.com/library/view/troubleshooting-cisco-ip/9780134305462/",
          "author": "Justin Jordan",
          "publisher": "Cisco Press",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134712956/",
          "title": "Fluid Mechanics for Chemical Engineers: with Microfluidics, CFD, and COMSOL Multiphysics 5, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/fluid-mechanics-for/9780134712956/",
          "author": "Conrad Carlberg",
          "publisher": "Prentice Hall",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491979792/",
          "title": "Ansible: Up and Running, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/ansible-up-and/9781491979792/",
          "author": "Lorin Hochstein",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781523084784/",
          "title": "The Innovation Code",
          "url": "https://www.safaribooksonline.com/library/view/the-innovation-code/9781523084784/",
          "author": "Staney DeGraff",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491944738/",
          "title": "Mobile Game Development with Unity",
          "url": "https://www.safaribooksonline.com/library/view/mobile-game-development/9781491944738/",
          "author": "Jon Manning",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781292200606/",
          "title": "The Power of Purpose",
          "url": "https://www.safaribooksonline.com/library/view/the-power-of/9781292200606/",
          "author": "Andrew Cave",
          "publisher": "Pearson Business",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491941294/",
          "title": "Concurrency in Go",
          "url": "https://www.safaribooksonline.com/library/view/concurrency-in-go/9781491941294/",
          "author": "Katherine Cox-Buday",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "August 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522522553/",
          "title": "Encyclopedia of Information Science and Technology, Fourth Edition",
          "url": "https://www.safaribooksonline.com/library/view/encyclopedia-of-information/9781522522553/",
          "author": "D.B.A. Mehdi Khosrow-Pour",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780857087157/",
          "title": "Influence",
          "url": "https://www.safaribooksonline.com/library/view/influence/9780857087157/",
          "author": "Warren Cass",
          "publisher": "John Wiley & Sons",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134685939/",
          "title": "Non-Designer's Presentation Book, The: Principles for effective presentation design, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/non-designers-presentation-book/9780134685939/",
          "author": "Robin Williams",
          "publisher": "Peachpit Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780081017654/",
          "title": "The Circuit Designer's Companion, 4th Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-circuit-designers/9780081017654/",
          "author": "Peter Wilson",
          "publisher": "Newnes",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134643779/",
          "title": "MCSA 70-697 and 70-698 Cert Guide: Configuring Windows Devices",
          "url": "https://www.safaribooksonline.com/library/view/mcsa-70-697-and/9780134643779/",
          "author": "Randy Bellet",
          "publisher": "Pearson IT Certification",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134173337/",
          "title": "Linux Hardening in Hostile Networks: Server Security from TLS to Tor, 1/e",
          "url": "https://www.safaribooksonline.com/library/view/linux-hardening-in/9780134173337/",
          "author": "Kyle Rankin",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438022/",
          "title": "Let the Story Do the Work",
          "url": "https://www.safaribooksonline.com/library/view/let-the-story/9780814438022/",
          "author": "Esther K. Choy",
          "publisher": "AMACOM",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491975954/",
          "title": "DevOps with OpenShift",
          "url": "https://www.safaribooksonline.com/library/view/devops-with-openshift/9781491975954/",
          "author": "Stefano Picozzi",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491972373/",
          "title": "Think Data Structures",
          "url": "https://www.safaribooksonline.com/library/view/think-data-structures/9781491972373/",
          "author": "Allen B. Downey",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781632651006/",
          "title": "Do It, Mean It, Be It",
          "url": "https://www.safaribooksonline.com/library/view/do-it-mean/9781632651006/",
          "author": "Corrie Shanahan",
          "publisher": "Career Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781632650955/",
          "title": "Thriving in the Gig Economy",
          "url": "https://www.safaribooksonline.com/library/view/thriving-in-the/9781632650955/",
          "author": "Marion McGovern",
          "publisher": "Career Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781680451887/",
          "title": "Making Things Smart",
          "url": "https://www.safaribooksonline.com/library/view/making-things-smart/9781680451887/",
          "author": "Gordon F. Williams",
          "publisher": "Maker Media, Inc",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134682921/",
          "title": "Predictive Analytics: Microsoft Excel 2016",
          "url": "https://www.safaribooksonline.com/library/view/predictive-analytics-microsoft/9780134682921/",
          "author": "Conrad Carlberg",
          "publisher": "Que",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781523095377/",
          "title": "Eat That Frog! Action Workbook",
          "url": "https://www.safaribooksonline.com/library/view/eat-that-frog/9781523095377/",
          "author": "Brian Tracy",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119272311/",
          "title": "The Bloomberg Way, 14th Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-bloomberg-way/9781119272311/",
          "author": "Bill Grueskin",
          "publisher": "John Wiley & Sons",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119235538/",
          "title": "Beginning Programming with Java For Dummies, 5th Edition",
          "url": "https://www.safaribooksonline.com/library/view/beginning-programming-with/9781119235538/",
          "author": "Barry A. Burd",
          "publisher": "John Wiley & Sons",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134659909/",
          "title": "Introduction to Game Design, Prototyping, and Development: From Concept to Playable Game with Unity and C#",
          "url": "https://www.safaribooksonline.com/library/view/introduction-to-game/9780134659909/",
          "author": "Jeremy Gibson Bond",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438541/",
          "title": "Rental-Property Profits, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/rental-property-profits-2nd/9780814438541/",
          "author": "Michael C. Thomsett",
          "publisher": "AMACOM",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438008/",
          "title": "Lead Right for Your Company's Type",
          "url": "https://www.safaribooksonline.com/library/view/lead-right-for/9780814438008/",
          "author": "William E. Schneider",
          "publisher": "AMACOM",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781634622462/",
          "title": "Introduction to Data Management Functions and Tools: IDMA 201 Course Textbook",
          "url": "https://www.safaribooksonline.com/library/view/introduction-to-data/9781634622462/",
          "author": "Insurance Data Management Association",
          "publisher": "Technics Publications",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781634622523/",
          "title": "Introduction to data management functions and tools: IDMA 201 Course Study Guide",
          "url": "https://www.safaribooksonline.com/library/view/introduction-to-data/9781634622523/",
          "author": "Insurance Data Management Association",
          "publisher": "Technics Publications",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442631/",
          "title": "IBM Spectrum Accelerate Deployment, Usage, and Maintenance",
          "url": "https://www.safaribooksonline.com/library/view/ibm-spectrum-accelerate/9780738442631/",
          "author": "Abilio Oliveira",
          "publisher": "IBM Redbooks",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491988527/",
          "title": "C# 7.0 Pocket Reference",
          "url": "https://www.safaribooksonline.com/library/view/c-70-pocket/9781491988527/",
          "author": "Ben Albahari",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442679/",
          "title": "IBM Z Connectivity Handbook",
          "url": "https://www.safaribooksonline.com/library/view/ibm-z-connectivity/9780738442679/",
          "author": "Octavian Lascu",
          "publisher": "IBM Redbooks",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119386728/",
          "title": "Mastering Autodesk Revit 2018",
          "url": "https://www.safaribooksonline.com/library/view/mastering-autodesk-revit/9781119386728/",
          "author": "Marcus Kim",
          "publisher": "John Wiley & Sons",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491996416/",
          "title": "The New Way to Hire",
          "url": "https://www.safaribooksonline.com/library/view/the-new-way/9781491996416/",
          "author": "Esther Schindler",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631593048/",
          "title": "Expressive Flower Painting",
          "url": "https://www.safaribooksonline.com/library/view/expressive-flower-painting/9781631593048/",
          "author": "Lynn Whipple",
          "publisher": "Quarry Books",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491995600/",
          "title": "Using Constraint Layouts in Android Studio",
          "url": "https://www.safaribooksonline.com/library/view/using-constraint-layouts/9781491995600/",
          "author": "Dawn Griffiths",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491983867/",
          "title": "Streaming Systems, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/streaming-systems-1st/9781491983867/",
          "author": "Tyler Akidau",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491935187/",
          "title": "Intelligence-Driven Incident Response, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/intelligence-driven-incident-response/9781491935187/",
          "author": "Scott J Roberts",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781449374631/",
          "title": "Cloud Native Java, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/cloud-native-java/9781449374631/",
          "author": "Josh Long",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491971093/",
          "title": "Applying the GDPR, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/applying-the-gdpr/9781491971093/",
          "author": "Chiara Rustici",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491954157/",
          "title": "Java 9 Modularity, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/java-9-modularity/9781491954157/",
          "author": "Sander Mak",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491974049/",
          "title": "Head First Android Development, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/head-first-android/9781491974049/",
          "author": "Dawn Griffiths",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491931240/",
          "title": "Network Programmability and Automation, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/network-programmability-and/9781491931240/",
          "author": "Jason Edelman",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491961643/",
          "title": "Building Progressive Web Apps, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/building-progressive-web/9781491961643/",
          "author": "Tal Ater",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491936153/",
          "title": "Kafka: The Definitive Guide, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/kafka-the-definitive/9781491936153/",
          "author": "Gwen Shapira",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491989517/",
          "title": "The State of CAD: 2017",
          "url": "https://www.safaribooksonline.com/library/view/the-state-of/9781491989517/",
          "author": "Mike Barlow",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491938836/",
          "title": "Agile Application Security, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/agile-application-security/9781491938836/",
          "author": "Laura Bell",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491938911/",
          "title": "Principles of Data Wrangling",
          "url": "https://www.safaribooksonline.com/library/view/principles-of-data/9781491938911/",
          "author": "Connor Carreras",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780240819150/",
          "title": "Audio Engineering 101",
          "url": "https://www.safaribooksonline.com/library/view/audio-engineering-101/9780240819150/",
          "author": "Tim Dittmar",
          "publisher": "Focal Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491959626/",
          "title": "Moving Hadoop to the Cloud",
          "url": "https://www.safaribooksonline.com/library/view/moving-hadoop-to/9781491959626/",
          "author": "Bill Havanki",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781562865825/",
          "title": "Partner for Performance: Strategically Aligning Learning and Development",
          "url": "https://www.safaribooksonline.com/library/view/partner-for-performance/9781562865825/",
          "author": "Karen Hicks",
          "publisher": "Association for Talent Development",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787127685/",
          "title": "Spring 5.0 Microservices - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/spring-50-microservices/9781787127685/",
          "author": "Rajesh R V",
          "publisher": "Packt Publishing",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522524175/",
          "title": "Building Brand Equity and Consumer Trust Through Radical Transparency Practices",
          "url": "https://www.safaribooksonline.com/library/view/building-brand-equity/9781522524175/",
          "author": "Marija Gogova Samonikov",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522531531/",
          "title": "Business Education and Ethics: Concepts, Methodologies, Tools, and Applications (Critical Exploration)",
          "url": "https://www.safaribooksonline.com/library/view/business-education-and/9781522531531/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527008/",
          "title": "Financial Entrepreneurship for Economic Growth in Emerging Nations",
          "url": "https://www.safaribooksonline.com/library/view/financial-entrepreneurship-for/9781522527008/",
          "author": "Brychan Thomas",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780128039298/",
          "title": "Computer and Information Security Handbook, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/computer-and-information/9780128039298/",
          "author": "John R. Vacca",
          "publisher": "Morgan Kaufmann",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438251/",
          "title": "The Camino Way",
          "url": "https://www.safaribooksonline.com/library/view/the-camino-way/9780814438251/",
          "author": "Victor Prince",
          "publisher": "AMACOM",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527336/",
          "title": "Establishing Food Security and Alternatives to International Trade in Emerging Economies",
          "url": "https://www.safaribooksonline.com/library/view/establishing-food-security/9781522527336/",
          "author": "Vasily Erokhin",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522529811/",
          "title": "Gaming Innovations in Higher Education: Emerging Research and Opportunities (Research Insight)",
          "url": "https://www.safaribooksonline.com/library/view/gaming-innovations-in/9781522529811/",
          "author": "Robert Costello",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522528357/",
          "title": "Global Entrepreneurship and New Venture Creation in the Sharing Economy",
          "url": "https://www.safaribooksonline.com/library/view/global-entrepreneurship-and/9781522528357/",
          "author": "Leena Ajit Kaushal",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527275/",
          "title": "Global Observations of the Influence of Culture on Consumer Buying Behavior",
          "url": "https://www.safaribooksonline.com/library/view/global-observations-of/9781522527275/",
          "author": "Sarmistha Sarma",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522528142/",
          "title": "Graph Theoretic Approaches for Analyzing Large-Scale Social Networks",
          "url": "https://www.safaribooksonline.com/library/view/graph-theoretic-approaches/9781522528142/",
          "author": "Natarajan Meghanathan",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526919/",
          "title": "Cross-Cultural Analysis of Image-Based Assessments: Emerging Research and Opportunities (Research Insight)",
          "url": "https://www.safaribooksonline.com/library/view/cross-cultural-analysis-of/9781522526919/",
          "author": "Michael Nering",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522530152/",
          "title": "Deep Learning Innovations and Their Convergence With Big Data",
          "url": "https://www.safaribooksonline.com/library/view/deep-learning-innovations/9781522530152/",
          "author": "N. Karthikeyan",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522528487/",
          "title": "Handbook of Research on Advanced Concepts in Real-Time Image and Video Processing",
          "url": "https://www.safaribooksonline.com/library/view/handbook-of-research/9781522528487/",
          "author": "Rajiv Kapoor",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522528388/",
          "title": "Handbook of Research on Human Development in the Digital Age",
          "url": "https://www.safaribooksonline.com/library/view/handbook-of-research/9781522528388/",
          "author": "Jillian R. Powers",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522529842/",
          "title": "Extending the Principles of Flipped Learning to Achieve Measurable Results: Emerging Research and Opportunities (Research Insight)",
          "url": "https://www.safaribooksonline.com/library/view/extending-the-principles/9781522529842/",
          "author": "William Swart",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522521761/",
          "title": "Concept Parsing Algorithms (CPA) for Textual Analysis and Discovery: Emerging Research and Opportunities (Research Insight)",
          "url": "https://www.safaribooksonline.com/library/view/concept-parsing-algorithms/9781522521761/",
          "author": "Masha Etkind",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522529538/",
          "title": "Handbook of Research on Digital Content, Mobile Learning, and Technology Integration Models in Teacher Education",
          "url": "https://www.safaribooksonline.com/library/view/handbook-of-research/9781522529538/",
          "author": "Jared Keengwe",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491943526/",
          "title": "Practical Modern JavaScript",
          "url": "https://www.safaribooksonline.com/library/view/practical-modern-javascript/9781491943526/",
          "author": "Nicolas Bevacqua",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522531586/",
          "title": "Biomedical Engineering: Concepts, Methodologies, Tools, and Applications (Critical Exploration)",
          "url": "https://www.safaribooksonline.com/library/view/biomedical-engineering-concepts/9781522531586/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522528050/",
          "title": "Modern Technologies for Big Data Classification and Clustering",
          "url": "https://www.safaribooksonline.com/library/view/modern-technologies-for/9781522528050/",
          "author": "B. K. Tripathy",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522528234/",
          "title": "Transformative Practice and Research in Organizational Communication",
          "url": "https://www.safaribooksonline.com/library/view/transformative-practice-and/9781522528234/",
          "author": "Erik Timmerman",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526858/",
          "title": "Personalized Professional Learning for Educators: Emerging Research and Opportunities (Research Insight)",
          "url": "https://www.safaribooksonline.com/library/view/personalized-professional-learning/9781522526858/",
          "author": "Diane Mason",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522530640/",
          "title": "Intelligent Vehicles and Materials Transportation in the Manufacturing Sector: Emerging Research and Opportunities (Research Insight)",
          "url": "https://www.safaribooksonline.com/library/view/intelligent-vehicles-and/9781522530640/",
          "author": "Susmita Bandyopadhyay",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527039/",
          "title": "Novel Six Sigma Approaches to Risk Assessment and Management",
          "url": "https://www.safaribooksonline.com/library/view/novel-six-sigma/9781522527039/",
          "author": "Vojo Bubevski",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527060/",
          "title": "Handbook of Research on Mobile Devices and Smart Gadgets in K-12 Education",
          "url": "https://www.safaribooksonline.com/library/view/handbook-of-research/9781522527060/",
          "author": "Sajid Umair",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522531630/",
          "title": "The Dark Web: Breakthroughs in Research and Practice (Critical Exploration)",
          "url": "https://www.safaribooksonline.com/library/view/the-dark-web/9781522531630/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522531685/",
          "title": "Health Economics and Healthcare Reform: Breakthroughs in Research and Practice (Critical Exploration)",
          "url": "https://www.safaribooksonline.com/library/view/health-economics-and/9781522531685/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527503/",
          "title": "Virtual Traumascapes and Exploring the Roots of Dark Tourism",
          "url": "https://www.safaribooksonline.com/library/view/virtual-traumascapes-and/9781522527503/",
          "author": "Babu George",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527190/",
          "title": "Hydrology and Best Practices for Managing Water Resources in Arid and Semi-Arid Lands",
          "url": "https://www.safaribooksonline.com/library/view/hydrology-and-best/9781522527190/",
          "author": "Johnson U. Kitheka",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527992/",
          "title": "Powering the Internet of Things With 5G Networks",
          "url": "https://www.safaribooksonline.com/library/view/powering-the-internet/9781522527992/",
          "author": "Ismat Aldmour",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522528975/",
          "title": "Social Media for Knowledge Management Applications in Modern Organizations",
          "url": "https://www.safaribooksonline.com/library/view/social-media-for/9781522528975/",
          "author": "Francesca Di Virgilio",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522527169/",
          "title": "Managerial Strategies for Business Sustainability During Turbulent Times",
          "url": "https://www.safaribooksonline.com/library/view/managerial-strategies-for/9781522527169/",
          "author": "Ramona-Diana Leon",
          "publisher": "IGI Global",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780128116470/",
          "title": "Op Amps for Everyone, 5th Edition",
          "url": "https://www.safaribooksonline.com/library/view/op-amps-for/9780128116470/",
          "author": "Ron Mancini",
          "publisher": "Newnes",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119226390/",
          "title": "Smart Cities",
          "url": "https://www.safaribooksonline.com/library/view/smart-cities/9781119226390/",
          "author": "Sabina Jeschke",
          "publisher": "John Wiley & Sons",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491958698/",
          "title": "Test-Driven Development with Python, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/test-driven-development-with/9781491958698/",
          "author": "Harry J.W. Percival",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781634622479/",
          "title": "DAMA-DMBOK: Data Management Body of Knowledge (2nd Edition)",
          "url": "https://www.safaribooksonline.com/library/view/dama-dmbok-data-management/9781634622479/",
          "author": "DAMA International",
          "publisher": "Technics Publications",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781780173405/",
          "title": "Cyber Security: A practitioner's guide",
          "url": "https://www.safaribooksonline.com/library/view/cyber-security-a/9781780173405/",
          "author": "David Sutton",
          "publisher": "BCS Learning & Development Limited",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788290883/",
          "title": "Learning SAP Analytics Cloud",
          "url": "https://www.safaribooksonline.com/library/view/learning-sap-analytics/9781788290883/",
          "author": "Riaz Ahmed",
          "publisher": "Packt Publishing",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780128114544/",
          "title": "Digital Signal Processing 101, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/digital-signal-processing/9780128114544/",
          "author": "Michael Parker",
          "publisher": "Newnes",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491917619/",
          "title": "Incident Management for Operations",
          "url": "https://www.safaribooksonline.com/library/view/incident-management-for/9781491917619/",
          "author": "Rob Schnepp",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788475655/",
          "title": "Java: Data Science Made Easy",
          "url": "https://www.safaribooksonline.com/library/view/java-data-science/9781788475655/",
          "author": "Alexey Grigorev",
          "publisher": "Packt Publishing",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134693866/",
          "title": "Learn Python 3 the Hard Way: A Very Simple Introduction to the Terrifyingly Beautiful World of Computers and Code",
          "url": "https://www.safaribooksonline.com/library/view/learn-python-3/9780134693866/",
          "author": "Zed A. Shaw",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781351984249/",
          "title": "Acting Exercises for Non-Traditional Staging",
          "url": "https://www.safaribooksonline.com/library/view/acting-exercises-for/9781351984249/",
          "author": "Anjalee Deshpande Hutchinson",
          "publisher": "Focal Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781351683111/",
          "title": "Film Directing Fundamentals, 4th Edition",
          "url": "https://www.safaribooksonline.com/library/view/film-directing-fundamentals/9781351683111/",
          "author": "Nicholas T. Proferes",
          "publisher": "Focal Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781849289405/",
          "title": "Collaborative Business Design: Improving and innovating the design of IT-driven business services",
          "url": "https://www.safaribooksonline.com/library/view/collaborative-business-design/9781849289405/",
          "author": "Leon-Paul de Rouw",
          "publisher": "IT Governance Ltd",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781351998475/",
          "title": "Editing and Montage in International Film and Video",
          "url": "https://www.safaribooksonline.com/library/view/editing-and-montage/9781351998475/",
          "author": "Luís Fernando Morales Morante",
          "publisher": "Focal Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781351816441/",
          "title": "Acting Shakespeare is Outrageous!",
          "url": "https://www.safaribooksonline.com/library/view/acting-shakespeare-is/9781351816441/",
          "author": "Herb Parker",
          "publisher": "Focal Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781315465319/",
          "title": "The Practical Zone System for Film and Digital Photography, 6th Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-practical-zone/9781315465319/",
          "author": "Chris Johnson",
          "publisher": "Focal Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781351809245/",
          "title": "Storytelling for Virtual Reality",
          "url": "https://www.safaribooksonline.com/library/view/storytelling-for-virtual/9781351809245/",
          "author": "John Bucher",
          "publisher": "Focal Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781315462196/",
          "title": "Broadcast News Writing, Reporting, and Producing, 7th Edition",
          "url": "https://www.safaribooksonline.com/library/view/broadcast-news-writing/9781315462196/",
          "author": "Frank Barnas",
          "publisher": "Focal Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438589/",
          "title": "101 Sample Write-Ups for Documenting Employee Performance Problems, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/101-sample-write-ups/9780814438589/",
          "author": "Paul Falcone",
          "publisher": "AMACOM",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781681983042/",
          "title": "CNC Milling for Makers",
          "url": "https://www.safaribooksonline.com/library/view/cnc-milling-for/9781681983042/",
          "author": "Christian Rattat",
          "publisher": "Rocky Nook",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781118436646/",
          "title": "Circuit Oriented Electromagnetic Modeling Using the PEEC Techniques",
          "url": "https://www.safaribooksonline.com/library/view/circuit-oriented-electromagnetic/9781118436646/",
          "author": "Lijun Jiang",
          "publisher": "John Wiley & Sons",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491982389/",
          "title": "JSON at Work",
          "url": "https://www.safaribooksonline.com/library/view/json-at-work/9781491982389/",
          "author": "Tom Marrs",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119417026/",
          "title": "What's Wrong with Damn Near Everything!",
          "url": "https://www.safaribooksonline.com/library/view/whats-wrong-with/9781119417026/",
          "author": "Larry Winget",
          "publisher": "John Wiley & Sons",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781634622394/",
          "title": "Analytics",
          "url": "https://www.safaribooksonline.com/library/view/analytics/9781634622394/",
          "author": "Shawn Rogers",
          "publisher": "Technics Publications",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780124104846/",
          "title": "Three-Dimensional Integrated Circuit Design, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/three-dimensional-integrated-circuit/9780124104846/",
          "author": "Eby G. Friedman",
          "publisher": "Morgan Kaufmann",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631575976/",
          "title": "Marketing Essentials for Independent Lodging",
          "url": "https://www.safaribooksonline.com/library/view/marketing-essentials-for/9781631575976/",
          "author": "Marie Lanier",
          "publisher": "Business Expert Press",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781780173368/",
          "title": "Agile Testing Foundations: An ISTQB Foundation Level Agile Tester guide",
          "url": "https://www.safaribooksonline.com/library/view/agile-testing-foundations/9781780173368/",
          "author": "Rex Black",
          "publisher": "BCS Learning & Development Limited",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749480301/",
          "title": "The Driving Instructor's Handbook, 20th Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-driving-instructors/9780749480301/",
          "author": "John Miller",
          "publisher": "Kogan Page",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749478506/",
          "title": "Leadership Team Coaching, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/leadership-team-coaching/9780749478506/",
          "author": "Peter Hawkins",
          "publisher": "Kogan Page",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749479725/",
          "title": "The People Business",
          "url": "https://www.safaribooksonline.com/library/view/the-people-business/9780749479725/",
          "author": "Imogen Osborne",
          "publisher": "Kogan Page",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749480288/",
          "title": "How to be an Even Better Manager, 10th Edition",
          "url": "https://www.safaribooksonline.com/library/view/how-to-be/9780749480288/",
          "author": "Michael Armstrong",
          "publisher": "Kogan Page",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491962183/",
          "title": "Zero Trust Networks",
          "url": "https://www.safaribooksonline.com/library/view/zero-trust-networks/9781491962183/",
          "author": "Doug Barth",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134657691/",
          "title": "The Rails 5 Way, Fourth Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-rails-5/9780134657691/",
          "author": "Obie Fernandez",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "July 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513599/",
          "title": "International Journal of Customer Relationship Marketing and Management (IJCRMM) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513599/",
          "author": "Riyad Eid",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512950/",
          "title": "International Journal of Adult Vocational Education and Technology (IJAVET) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512950/",
          "author": "Lyle Yorks",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514374/",
          "title": "International Journal of Knowledge Society Research (IJKSR) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514374/",
          "author": "Linda Daniela",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512653/",
          "title": "International Journal of Interdisciplinary Telecommunications and Networking (IJITN) Volume 9, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512653/",
          "author": "Michael Bartolacci",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514077/",
          "title": "International Journal of Cyber Warfare and Terrorism (IJCWT) Volume 7, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514077/",
          "author": "Brett van Niekerk",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515234/",
          "title": "International Journal of Energy Optimization and Engineering (IJEOE) Volume 6, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515234/",
          "author": "Pandian Vasant",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511434/",
          "title": "International Journal of E-Business Research (IJEBR) Volume 13, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511434/",
          "author": "Jeffrey Hsu",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513315/",
          "title": "International Journal of Operations Research and Information Systems (IJORIS) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513315/",
          "author": "John Wang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522523017/",
          "title": "International Journal of Ambient Computing and Intelligence (IJACI) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522523017/",
          "author": "Nilanjan Dey",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513919/",
          "title": "International Journal of Agricultural and Environmental Information Systems (IJAEIS) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513919/",
          "author": "Petraq Papajorgji",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515647/",
          "title": "International Journal of Applied Management Sciences and Engineering (IJAMSE) Volume 4, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515647/",
          "author": "Carolina Machado",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511854/",
          "title": "International Journal of Information Systems in the Service Sector (IJISSS) Volume 9, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511854/",
          "author": "John Wang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513032/",
          "title": "International Journal of Innovation in the Digital Economy (IJIDE) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513032/",
          "author": "Ionica Oncioiu",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522516064/",
          "title": "International Journal of ICT Research in Africa and the Middle East (IJICTRAME) Volume 6, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522516064/",
          "author": "Ewa Lechman",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514954/",
          "title": "International Journal of Fuzzy System Applications (IJFSA) Volume 6, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514954/",
          "author": "Deng-Feng Li",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511472/",
          "title": "International Journal of Intelligent Information Technologies (IJIIT) Volume 13, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511472/",
          "author": "Vijayan Sugumaran",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513650/",
          "title": "International Journal of Human Capital and Information Technology Professionals (IJHCITP) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513650/",
          "author": "Ricardo Colomo-Palacios",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515036/",
          "title": "International Journal of Cloud Applications and Computing (IJCAC) Volume 7, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515036/",
          "author": "Mehdi Khosrow-Pour",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512257/",
          "title": "International Journal of Information Systems and Social Change (IJISSC) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512257/",
          "author": "John Wang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511335/",
          "title": "International Journal of Data Warehousing and Mining (IJDWM) Volume 13, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511335/",
          "author": "David Taniar",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512813/",
          "title": "International Journal of Mobile Human Computer Interaction (IJMHCI) Volume 9, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512813/",
          "author": "Joanna Lumsden",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512295/",
          "title": "International Journal of Digital Crime and Forensics (IJDCF) Volume 9, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512295/",
          "author": "Wei Qi Yan",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515357/",
          "title": "International Journal of Sustainable Economies Management (IJSEM) Volume 6, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515357/",
          "author": "Gheorghe H. Popescu",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514749/",
          "title": "International Journal of Privacy and Health Information Management (IJPHIM) Volume 5, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514749/",
          "author": "Ernesto Jimenez-Ruiz",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511137/",
          "title": "International Journal of Web Services Research (IJWSR) Volume 14, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511137/",
          "author": "Liang-Jie Zhang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513094/",
          "title": "International Journal of Technology Diffusion (IJTD) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513094/",
          "author": "Ali Zolait",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514886/",
          "title": "International Journal of Applied Industrial Engineering (IJAIE) Volume 4, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514886/",
          "author": "Lanndon Ocampo",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514916/",
          "title": "International Journal of Online Marketing (IJOM) Volume 7, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514916/",
          "author": "Hatem El-Gohary",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512493/",
          "title": "International Journal of Multimedia Data Engineering and Management (IJMDEM) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512493/",
          "author": "Shu-Ching Chen",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514138/",
          "title": "International Journal of Knowledge and Systems Science (IJKSS) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514138/",
          "author": "W.B. Lee",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515395/",
          "title": "International Journal of Risk and Contingency Management (IJRCM) Volume 6, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515395/",
          "author": "Kenneth Strang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514299/",
          "title": "International Journal of Knowledge-Based Organizations (IJKBO) Volume 7, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514299/",
          "author": "John Wang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511793/",
          "title": "International Journal of Information Systems and Supply Chain Management (IJISSCM) Volume 10, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511793/",
          "author": "John Wang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511632/",
          "title": "International Journal of Information Technology and Web Engineering (IJITWE) Volume 12, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511632/",
          "author": "Ghazi Alkhatib",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515739/",
          "title": "International Journal of Rough Sets and Data Analysis (IJRSDA) Volume 4, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515739/",
          "author": "Nilanjan Dey",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512011/",
          "title": "International Journal of Information Technology Project Management (IJITPM) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512011/",
          "author": "John Wang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512417/",
          "title": "International Journal of Mobile and Blended Learning (IJMBL) Volume 9, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512417/",
          "author": "David Parsons",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513230/",
          "title": "International Journal of Applied Metaheuristic Computing (IJAMC) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513230/",
          "author": "Peng-Yeng Yin",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511892/",
          "title": "Journal of Information Technology Research (JITR) Volume 10, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/journal-of-information/9781522511892/",
          "author": "Francisco José García-Peñalvo",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511670/",
          "title": "International Journal of Healthcare Information Systems and Informatics (IJHISI) Volume 12, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511670/",
          "author": "Joseph Tan",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631593031/",
          "title": "Drawing Perspective Methods for Artists",
          "url": "https://www.safaribooksonline.com/library/view/drawing-perspective-methods/9781631593031/",
          "author": "Tim Proetel",
          "publisher": "Rockport Publishers",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512998/",
          "title": "International Journal of Service Science, Management, Engineering, and Technology (IJSSMET) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512998/",
          "author": "Ghazy Assassa",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511823/",
          "title": "International Journal of Information Technologies and Systems Approach (IJITSA) Volume 10, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511823/",
          "author": "Manuel Mora",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515968/",
          "title": "International Journal of Quantitative Structure-Property Relationships (IJQSPR) Volume 2, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515968/",
          "author": "Kunal Roy",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515692/",
          "title": "International Journal of Public Administration in the Digital Age (IJPADA) Volume 4, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515692/",
          "author": "Christopher Reddick",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513766/",
          "title": "International Journal of Technoethics (IJT) Volume 8, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513766/",
          "author": "Rocci Luppicini",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514336/",
          "title": "International Journal of Information Retrieval Research (IJIRR) Volume 7, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514336/",
          "author": "Zhongyu Lu",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513551/",
          "title": "International Journal of Swarm Intelligence Research (IJSIR) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513551/",
          "author": "Yuhui Shi",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511298/",
          "title": "International Journal of Technology and Human Interaction (IJTHI) Volume 13, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511298/",
          "author": "Chia-Wen Tsai",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511090/",
          "title": "International Journal of Distance Education Technologies (IJDET) Volume 15, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511090/",
          "author": "Maiga Chang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522510796/",
          "title": "Journal of Global Information Management (JGIM) Volume 25, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/journal-of-global/9781522510796/",
          "author": "Zuopeng Zhang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522510864/",
          "title": "Journal of Organizational and End User Computing (JOEUC) Volume 29, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/journal-of-organizational/9781522510864/",
          "author": "Steven Walczak",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514558/",
          "title": "International Journal of Manufacturing, Materials, and Mechanical Engineering (IJMMME) Volume 7, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514558/",
          "author": "J. Davim",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514473/",
          "title": "International Journal of Online Pedagogy and Course Design (IJOPCD) Volume 7, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514473/",
          "author": "Pei-Di Shen",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513834/",
          "title": "International Journal of E-Health and Medical Communications (IJEHMC) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513834/",
          "author": "Joel Rodrigues",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515593/",
          "title": "International Journal of Business Analytics (IJBAN) Volume 4, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515593/",
          "author": "John Wang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522516040/",
          "title": "International Journal of Public and Private Perspectives on Healthcare, Culture, and the Environment (IJPPPHCE) Volume 1, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522516040/",
          "author": "Mika Merviö",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515555/",
          "title": "International Journal of Software Innovation (IJSI) Volume 5, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515555/",
          "author": "Roger Lee",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515869/",
          "title": "International Journal of Bias, Identity and Diversities in Education (IJBIDE) Volume 2, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515869/",
          "author": "Julie Byrd Clark",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515319/",
          "title": "International Journal of System Dynamics Applications (IJSDA) Volume 6, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515319/",
          "author": "Ahmad Taher Azar",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513278/",
          "title": "International Journal of Organizational and Collective Intelligence (IJOCI) Volume 7, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513278/",
          "author": "Victor Chang",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515203/",
          "title": "International Journal of Productivity Management and Assessment Technologies (IJPMAT) Volume 5, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515203/",
          "author": "Bryan Christiansen",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513384/",
          "title": "International Journal of Synthetic Emotions (IJSE) Volume 8, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513384/",
          "author": "Nilanjan Dey",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513155/",
          "title": "International Journal of Asian Business and Information Management (IJABIM) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513155/",
          "author": "Patricia Ordóñez de Pablos",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514213/",
          "title": "International Journal of Social Ecology and Sustainable Development (IJSESD) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514213/",
          "author": "Elias Carayannis",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511175/",
          "title": "International Journal of Web-Based Learning and Teaching Technologies (IJWLTT) Volume 12, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511175/",
          "author": "Mahesh Raisinghani",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522513193/",
          "title": "International Journal of Applied Geospatial Research (IJAGR) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522513193/",
          "author": "Donald Patrick Albert",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511212/",
          "title": "International Journal of Information and Communication Technology Education (IJICTE) Volume 13, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511212/",
          "author": "Lawrence Tomei",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511755/",
          "title": "International Journal of Information Security and Privacy (IJISP) Volume 11, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511755/",
          "author": "Dalei Wu",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515135/",
          "title": "International Journal of Reliable and Quality E-Healthcare (IJRQEH) Volume 6, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515135/",
          "author": "Anastasius Moumtzoglou",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522515173/",
          "title": "International Journal of E-Planning Research (IJEPR) Volume 6, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522515173/",
          "author": "Carlos Silva",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511403/",
          "title": "International Journal of Business Data Communications and Networking (IJBDCN) Volume 13, Issue 2",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511403/",
          "author": "Zoubir Mammeri",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522510970/",
          "title": "Information Resources Management Journal (IRMJ) Volume 30, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/information-resources-management/9781522510970/",
          "author": "George Kelley",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512578/",
          "title": "International Journal of Decision Support System Technology (IJDSST) Volume 9, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512578/",
          "author": "Pascale Zaraté",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511052/",
          "title": "Journal of Electronic Commerce in Organizations (JECO) Volume 15, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/journal-of-electronic/9781522511052/",
          "author": "Pedro Isaías",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511939/",
          "title": "International Journal of Information Communication Technologies and Human Development (IJICTHD) Volume 9, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511939/",
          "author": "Hakikur Rahman",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522512059/",
          "title": "International Journal of Grid and High Performance Computing (IJGHPC) Volume 9, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522512059/",
          "author": "Mohammad Khan",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522511373/",
          "title": "International Journal of Enterprise Information Systems (IJEIS) Volume 13, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522511373/",
          "author": "Madjid Tavana",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522514039/",
          "title": "International Journal of Distributed Systems and Technologies (IJDST) Volume 8, Issue 3",
          "url": "https://www.safaribooksonline.com/library/view/international-journal-of/9781522514039/",
          "author": "Nik Bessis",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785886188/",
          "title": "Practical Predictive Analytics",
          "url": "https://www.safaribooksonline.com/library/view/practical-predictive-analytics/9781785886188/",
          "author": "Ralph Winters",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787287945/",
          "title": "Frank Kane's Taming Big Data with Apache Spark and Python",
          "url": "https://www.safaribooksonline.com/library/view/frank-kanes-taming/9781787287945/",
          "author": "Frank Kane",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787122819/",
          "title": "Practical Game AI Programming",
          "url": "https://www.safaribooksonline.com/library/view/practical-game-ai/9781787122819/",
          "author": "Micael DaGraça",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787283282/",
          "title": "Mastering Embedded Linux Programming - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/mastering-embedded-linux/9781787283282/",
          "author": "Chris Simmonds",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788471060/",
          "title": "Jenkins Essentials - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/jenkins-essentials-/9781788471060/",
          "author": "Mitesh Soni",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787280168/",
          "title": "Mobile Test Automation with Appium",
          "url": "https://www.safaribooksonline.com/library/view/mobile-test-automation/9781787280168/",
          "author": "Nishant Verma",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787125698/",
          "title": "Python for Finance Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/python-for-finance/9781787125698/",
          "author": "Yuxing Yan",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781316817421/",
          "title": "Groups, Graphs and Random Walks",
          "url": "https://www.safaribooksonline.com/library/view/groups-graphs-and/9781316817421/",
          "author": "Ecaterina Sava-Huss",
          "publisher": "Cambridge University Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522524144/",
          "title": "Patent Law and Intellectual Property in the Medical Field",
          "url": "https://www.safaribooksonline.com/library/view/patent-law-and/9781522524144/",
          "author": "Rajinder Kaur",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787123137/",
          "title": "Learning pandas - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/learning-pandas-/9781787123137/",
          "author": "Michael Heydt",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781782175223/",
          "title": "Getting Started with Nano Server",
          "url": "https://www.safaribooksonline.com/library/view/getting-started-with/9781782175223/",
          "author": "Charbel Nemnom",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787289352/",
          "title": "Mastering Active Directory",
          "url": "https://www.safaribooksonline.com/library/view/mastering-active-directory/9781787289352/",
          "author": "Dishan Francis",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786469847/",
          "title": "QlikView for Developers",
          "url": "https://www.safaribooksonline.com/library/view/qlikview-for-developers/9781786469847/",
          "author": "Barry Harmsen",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526339/",
          "title": "Sustainable Health and Long-Term Care Solutions for an Aging Population",
          "url": "https://www.safaribooksonline.com/library/view/sustainable-health-and/9781522526339/",
          "author": "Peter Yuen",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787286450/",
          "title": "Game Audio Development with Unity 5.X",
          "url": "https://www.safaribooksonline.com/library/view/game-audio-development/9781787286450/",
          "author": "Micheal Lanham",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785884283/",
          "title": "Learning Angular for .NET Developers",
          "url": "https://www.safaribooksonline.com/library/view/learning-angular-for/9781785884283/",
          "author": "Rajesh Gunasundaram",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787120235/",
          "title": "Mastering Kali Linux for Advanced Penetration Testing - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/mastering-kali-linux/9781787120235/",
          "author": "Vijay Kumar Velu",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786461827/",
          "title": "SQL Server 2017 Integration Services Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/sql-server-2017/9781786461827/",
          "author": "Dejan Sarka",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785889295/",
          "title": "Bootstrap 4 Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/bootstrap-4-cookbook/9781785889295/",
          "author": "Ajdin Imsirovic",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787126992/",
          "title": "Distributed Computing in Java 9",
          "url": "https://www.safaribooksonline.com/library/view/distributed-computing-in/9781787126992/",
          "author": "Raja Malleswara Rao Pattamsetti",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786460165/",
          "title": "Expert Delphi",
          "url": "https://www.safaribooksonline.com/library/view/expert-delphi/9781786460165/",
          "author": "Paweł Głowacki",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787280649/",
          "title": "Comprehensive Ruby Programming",
          "url": "https://www.safaribooksonline.com/library/view/comprehensive-ruby-programming/9781787280649/",
          "author": "Jordan Hudgens",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787289246/",
          "title": "Android Things Projects",
          "url": "https://www.safaribooksonline.com/library/view/android-things-projects/9781787289246/",
          "author": "Francesco Azzola",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781292139098/",
          "title": "Brilliant Coaching 3e, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/brilliant-coaching-3e/9781292139098/",
          "author": "Julie Starr",
          "publisher": "Pearson Business",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787283695/",
          "title": "Daniel Arbuckle’s Mastering Python",
          "url": "https://www.safaribooksonline.com/library/view/daniel-arbuckles-mastering/9781787283695/",
          "author": "Daniel Arbuckle",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134685922/",
          "title": "NCLEX-PN Practice Questions Exam Cram, 5th Edition",
          "url": "https://www.safaribooksonline.com/library/view/nclex-pn-practice-questions/9780134685922/",
          "author": "Clara Hurd",
          "publisher": "Pearson IT Certification",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134752792/",
          "title": "My Smart Home for Seniors",
          "url": "https://www.safaribooksonline.com/library/view/my-smart-home/9780134752792/",
          "author": "Michael R. Miller",
          "publisher": "Que",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786462305/",
          "title": "OpenDaylight Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/opendaylight-cookbook/9781786462305/",
          "author": "Yrineu Rodrigues",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787282513/",
          "title": "ArcPy and ArcGIS - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/arcpy-and-arcgis/9781787282513/",
          "author": "Dara O'Beirne",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781108206686/",
          "title": "Information Theoretic Security and Privacy of Information Systems",
          "url": "https://www.safaribooksonline.com/library/view/information-theoretic-security/9781108206686/",
          "author": "H. Vincent Poor",
          "publisher": "Cambridge University Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781108206075/",
          "title": "Fundamentals of Nonparametric Bayesian Inference",
          "url": "https://www.safaribooksonline.com/library/view/fundamentals-of-nonparametric/9781108206075/",
          "author": "Aad van der Vaart",
          "publisher": "Cambridge University Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786467119/",
          "title": "Moodle 3.x Developer's Guide",
          "url": "https://www.safaribooksonline.com/library/view/moodle-3x-developers/9781786467119/",
          "author": "Ian Wild",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787129627/",
          "title": "Practical Data Science Cookbook, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/practical-data-science/9781787129627/",
          "author": "Abhijit Dasgupta",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788290685/",
          "title": "Learn Arduino Prototyping in 10 days",
          "url": "https://www.safaribooksonline.com/library/view/learn-arduino-prototyping/9781788290685/",
          "author": "Kallol Bosu Roy Choudhuri",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787127944/",
          "title": "Introduction to JVM Languages",
          "url": "https://www.safaribooksonline.com/library/view/introduction-to-jvm/9781787127944/",
          "author": "Vincent van der Leun",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787123175/",
          "title": "Mastering Spring 5.0",
          "url": "https://www.safaribooksonline.com/library/view/mastering-spring-50/9781787123175/",
          "author": "Ranga Rao Karanam",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781784395070/",
          "title": "Mastering Kali Linux for Web Penetration Testing",
          "url": "https://www.safaribooksonline.com/library/view/mastering-kali-linux/9781784395070/",
          "author": "Michael McPhee",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787126893/",
          "title": "Learning Salesforce Einstein",
          "url": "https://www.safaribooksonline.com/library/view/learning-salesforce-einstein/9781787126893/",
          "author": "Mohith Shrivastava",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781784397005/",
          "title": "Mastering Python Networking",
          "url": "https://www.safaribooksonline.com/library/view/mastering-python-networking/9781784397005/",
          "author": "Eric Chou",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787121140/",
          "title": "Microservices with Azure",
          "url": "https://www.safaribooksonline.com/library/view/microservices-with-azure/9781787121140/",
          "author": "Rahul Rai",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787120495/",
          "title": "C++17 STL Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/c17-stl-cookbook/9781787120495/",
          "author": "Jacek Galowicz",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787288744/",
          "title": "Penetration Testing Bootcamp",
          "url": "https://www.safaribooksonline.com/library/view/penetration-testing-bootcamp/9781787288744/",
          "author": "Jason Beltrame",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781783286836/",
          "title": "Go Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/go-cookbook/9781783286836/",
          "author": "Aaron Torres",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526216/",
          "title": "Open and Distance Learning Initiatives for Sustainable Development",
          "url": "https://www.safaribooksonline.com/library/view/open-and-distance/9781522526216/",
          "author": "Verlaxmi Indrakanti",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781606498859/",
          "title": "A Primer on Corporate Governance",
          "url": "https://www.safaribooksonline.com/library/view/a-primer-on/9781606498859/",
          "author": "Alessandro Zattoni",
          "publisher": "Business Expert Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781562865764/",
          "title": "Virtual Training Tools and Templates: An Action Guide to Live Online Learning",
          "url": "https://www.safaribooksonline.com/library/view/virtual-training-tools/9781562865764/",
          "author": "Cindy Huggett",
          "publisher": "Association for Talent Development",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785882814/",
          "title": "Mastering PHP 7",
          "url": "https://www.safaribooksonline.com/library/view/mastering-php-7/9781785882814/",
          "author": "Branko Ajzele",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787126671/",
          "title": "Microsoft IIS 10.0 Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/microsoft-iis-100/9781787126671/",
          "author": "Ashraf Khan",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631576911/",
          "title": "Tough Calls",
          "url": "https://www.safaribooksonline.com/library/view/tough-calls/9781631576911/",
          "author": "Linda D. Henman",
          "publisher": "Business Expert Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781606509289/",
          "title": "Perfectionism in School",
          "url": "https://www.safaribooksonline.com/library/view/perfectionism-in-school/9781606509289/",
          "author": "Kristie L. Speirs Neumeister",
          "publisher": "Momentum Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781317516545/",
          "title": "Outdoor Flash Photography",
          "url": "https://www.safaribooksonline.com/library/view/outdoor-flash-photography/9781317516545/",
          "author": "Barbara Eddy",
          "publisher": "Focal Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491972946/",
          "title": "Advanced Analytics with Spark, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/advanced-analytics-with/9781491972946/",
          "author": "Uri Laserson",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781315454832/",
          "title": "Scheduling and Budgeting Your Film, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/scheduling-and-budgeting/9781315454832/",
          "author": "Paula Landry",
          "publisher": "Focal Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781317387466/",
          "title": "Digital Costume Design and Collaboration",
          "url": "https://www.safaribooksonline.com/library/view/digital-costume-design/9781317387466/",
          "author": "Rafael Jaen",
          "publisher": "Focal Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781351847742/",
          "title": "The Corporate Media Toolkit",
          "url": "https://www.safaribooksonline.com/library/view/the-corporate-media/9781351847742/",
          "author": "Ray DiZazzo",
          "publisher": "Focal Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491963739/",
          "title": "Powering Content",
          "url": "https://www.safaribooksonline.com/library/view/powering-content/9781491963739/",
          "author": "Laura Busche",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491981641/",
          "title": "Text Mining with R",
          "url": "https://www.safaribooksonline.com/library/view/text-mining-with/9781491981641/",
          "author": "David Robinson",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781315514154/",
          "title": "The Makeup Artist Handbook, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-makeup-artist/9781315514154/",
          "author": "Mindy Hall",
          "publisher": "Focal Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781626569959/",
          "title": "Extraordinary PR, Ordinary Budget",
          "url": "https://www.safaribooksonline.com/library/view/extraordinary-pr-ordinary/9781626569959/",
          "author": "Jennifer R. Farmer",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491954379/",
          "title": "Mastering Bitcoin, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/mastering-bitcoin-2nd/9781491954379/",
          "author": "Andreas M. Antonopoulos",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134683355/",
          "title": "CompTIA Cybersecurity Analyst (CSA+) Cert Guide",
          "url": "https://www.safaribooksonline.com/library/view/comptia-cybersecurity-analyst/9780134683355/",
          "author": "Troy McMillan",
          "publisher": "Pearson IT Certification",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119348504/",
          "title": "Understanding Systemic Risk in Global Financial Markets",
          "url": "https://www.safaribooksonline.com/library/view/understanding-systemic-risk/9781119348504/",
          "author": "Michael Leibrock",
          "publisher": "John Wiley & Sons",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442648/",
          "title": "Building Cognitive Applications with IBM Watson Services: Volume 1 Getting Started",
          "url": "https://www.safaribooksonline.com/library/view/building-cognitive-applications/9780738442648/",
          "author": "Marcel Ribas",
          "publisher": "IBM Redbooks",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781259836053/",
          "title": "The Leadership Mind Switch: Rethinking How We Lead in the New World of Work",
          "url": "https://www.safaribooksonline.com/library/view/the-leadership-mind/9781259836053/",
          "author": "Kylie Wright-Ford",
          "publisher": "McGraw-Hill",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781259836084/",
          "title": "Good Stocks Cheap: Value Investing with Confidence for a Lifetime of Stock Market Outperformance",
          "url": "https://www.safaribooksonline.com/library/view/good-stocks-cheap/9781259836084/",
          "author": "Kenneth Jeffrey Marshall",
          "publisher": "McGraw-Hill",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781108150132/",
          "title": "Synchronization in Digital Communication Systems",
          "url": "https://www.safaribooksonline.com/library/view/synchronization-in-digital/9781108150132/",
          "author": "John Proakis",
          "publisher": "Cambridge University Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438794/",
          "title": "The Supply Chain Revolution",
          "url": "https://www.safaribooksonline.com/library/view/the-supply-chain/9780814438794/",
          "author": "Suman Sarkar",
          "publisher": "AMACOM",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438169/",
          "title": "Career Match, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/career-match-2nd/9780814438169/",
          "author": "Ann Bidou",
          "publisher": "AMACOM",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134844794/",
          "title": "Adobe Acrobat DC Classroom in a Book, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/adobe-acrobat-dc/9780134844794/",
          "author": "Brie Gyncild",
          "publisher": "Adobe Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781492023456/",
          "title": "The Arduino Inventor's Guide",
          "url": "https://www.safaribooksonline.com/library/view/the-arduino-inventors/9781492023456/",
          "author": "Brian Huang",
          "publisher": "No Starch Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788293181/",
          "title": "The Python Apprentice",
          "url": "https://www.safaribooksonline.com/library/view/the-python-apprentice/9781788293181/",
          "author": "Austin Bingham",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781784396879/",
          "title": "Mastering Bash",
          "url": "https://www.safaribooksonline.com/library/view/mastering-bash/9781784396879/",
          "author": "Giorgio Zarrelli",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631576287/",
          "title": "Co-Create",
          "url": "https://www.safaribooksonline.com/library/view/co-create/9781631576287/",
          "author": "Steve Martin",
          "publisher": "Business Expert Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787120426/",
          "title": "Learning RxJava",
          "url": "https://www.safaribooksonline.com/library/view/learning-rxjava/9781787120426/",
          "author": "Thomas Nield",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781292200644/",
          "title": "The Little Book of Big Management Theories, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-little-book/9781292200644/",
          "author": "Dr. Bob Bates",
          "publisher": "Pearson Business",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787287174/",
          "title": "Mastering Java EE Development with WildFly",
          "url": "https://www.safaribooksonline.com/library/view/mastering-java-ee/9781787287174/",
          "author": "Luca Stancapiano",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787281943/",
          "title": "HoloLens Blueprints",
          "url": "https://www.safaribooksonline.com/library/view/hololens-blueprints/9781787281943/",
          "author": "Mallikarjuna Rao",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491981269/",
          "title": "The Customer-Driven Playbook",
          "url": "https://www.safaribooksonline.com/library/view/the-customer-driven-playbook/9781491981269/",
          "author": "Jessica Rich",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134586656/",
          "title": "Cisco ISE for BYOD and Secure Unified Access, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/cisco-ise-for/9780134586656/",
          "author": "Jamey Heary",
          "publisher": "Cisco Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526599/",
          "title": "Urbanization and Its Impact on Socio-Economic Growth in Developing Regions",
          "url": "https://www.safaribooksonline.com/library/view/urbanization-and-its/9781522526599/",
          "author": "Indo Benna",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526247/",
          "title": "Optimizing Open and Distance Learning in Higher Education Institutions",
          "url": "https://www.safaribooksonline.com/library/view/optimizing-open-and/9781522526247/",
          "author": "Verlaxmi Indrakanti",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525943/",
          "title": "Game Theory: Breakthroughs in Research and Practice",
          "url": "https://www.safaribooksonline.com/library/view/game-theory-breakthroughs/9781522525943/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525844/",
          "title": "Student Engagement and Participation: Concepts, Methodologies, Tools, and Applications",
          "url": "https://www.safaribooksonline.com/library/view/student-engagement-and/9781522525844/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525752/",
          "title": "Smart Technologies for Emergency Response and Disaster Management",
          "url": "https://www.safaribooksonline.com/library/view/smart-technologies-for/9781522525752/",
          "author": "Kaoru Ota",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526537/",
          "title": "Novel Design and the Applications of Smart-M3 Platform in the Internet of Things: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/novel-design-and/9781522526537/",
          "author": "Sergey Balandin",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526131/",
          "title": "Managing Self-Directed Learning in Primary School Education: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/managing-self-directed-learning/9781522526131/",
          "author": "Penny Van Deur",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525998/",
          "title": "Mobile Commerce: Concepts, Methodologies, Tools, and Applications",
          "url": "https://www.safaribooksonline.com/library/view/mobile-commerce-concepts/9781522525998/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526735/",
          "title": "Geopolitics and Strategic Management in the Global Economy",
          "url": "https://www.safaribooksonline.com/library/view/geopolitics-and-strategic/9781522526735/",
          "author": "Lorn R. Sheehan",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526049/",
          "title": "Information Technology Risk Management and Compliance in Modern Organizations",
          "url": "https://www.safaribooksonline.com/library/view/information-technology-risk/9781522526049/",
          "author": "Pavankumar Mulgund",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522522652/",
          "title": "Ideological Function of Deming Theory in Higher Education: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/ideological-function-of/9781522522652/",
          "author": "Anastasia Sioutou",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781632650931/",
          "title": "7 Principles of Transformational Leadership",
          "url": "https://www.safaribooksonline.com/library/view/7-principles-of/9781632650931/",
          "author": "Hugh Blane",
          "publisher": "Career Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525813/",
          "title": "Funding Challenges and Successes in Arts Education",
          "url": "https://www.safaribooksonline.com/library/view/funding-challenges-and/9781522525813/",
          "author": "Richard Emanuel",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526629/",
          "title": "Green Initiatives for Business Sustainability and Value Creation",
          "url": "https://www.safaribooksonline.com/library/view/green-initiatives-for/9781522526629/",
          "author": "Sandip Anand",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525899/",
          "title": "Smart Technologies: Breakthroughs in Research and Practice",
          "url": "https://www.safaribooksonline.com/library/view/smart-technologies-breakthroughs/9781522525899/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781317302940/",
          "title": "Recording Tips for Engineers, 4th Edition",
          "url": "https://www.safaribooksonline.com/library/view/recording-tips-for/9781317302940/",
          "author": "Tim Crich",
          "publisher": "Focal Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525783/",
          "title": "Global Ideologies Surrounding Children's Rights and Social Justice",
          "url": "https://www.safaribooksonline.com/library/view/global-ideologies-surrounding/9781522525783/",
          "author": "Icarbord Tshabangu",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526162/",
          "title": "Optimizing Human-Computer Interaction With Emerging Technologies",
          "url": "https://www.safaribooksonline.com/library/view/optimizing-human-computer-interaction/9781522526162/",
          "author": "Francisco Cipolla-Ficarra",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788293747/",
          "title": "R: Mining Spatial, Text, Web, and Social Media Data",
          "url": "https://www.safaribooksonline.com/library/view/r-mining-spatial/9781788293747/",
          "author": "Richard Heimann",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781523083657/",
          "title": "Who Do We Choose To Be?",
          "url": "https://www.safaribooksonline.com/library/view/who-do-we/9781523083657/",
          "author": "Margaret J. Wheatley",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491925607/",
          "title": "Fundamentals of Deep Learning",
          "url": "https://www.safaribooksonline.com/library/view/fundamentals-of-deep/9781491925607/",
          "author": "Nikhil Buduma",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134307091/",
          "title": "IoT Fundamentals: Networking Technologies, Protocols, and Use Cases for the Internet of Things",
          "url": "https://www.safaribooksonline.com/library/view/iot-fundamentals-networking/9780134307091/",
          "author": "Rob Barton",
          "publisher": "Cisco Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526568/",
          "title": "Driving Traffic and Customer Activity Through Affiliate Marketing",
          "url": "https://www.safaribooksonline.com/library/view/driving-traffic-and/9781522526568/",
          "author": "Surabhi Singh",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526360/",
          "title": "Computational Techniques for Modeling Atmospheric Processes",
          "url": "https://www.safaribooksonline.com/library/view/computational-techniques-for/9781522526360/",
          "author": "Anatoliy Doroshenko",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526070/",
          "title": "Applying Big Data Analytics in Bioinformatics and Medicine",
          "url": "https://www.safaribooksonline.com/library/view/applying-big-data/9781522526070/",
          "author": "Paraskevi Papadopoulou",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526278/",
          "title": "Enterprise Resiliency in the Continuum of Change: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/enterprise-resiliency-in/9781522526278/",
          "author": "Raj Kumar Bhattarai",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526308/",
          "title": "Formative Assessment Practices for Pre-Service Teacher Practicum Feedback: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/formative-assessment-practices/9781522526308/",
          "author": "Shirley O'Neill",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526452/",
          "title": "Administrative Leadership in Open and Distance Learning Programs",
          "url": "https://www.safaribooksonline.com/library/view/administrative-leadership-in/9781522526452/",
          "author": "Aras Bozkurt",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522521846/",
          "title": "Advanced Concept Maps in STEM Education: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/advanced-concept-maps/9781522521846/",
          "author": "Arunprakash T. Karunanithi",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526100/",
          "title": "Examining the Changing Role of Supervision in Doctoral Research Projects: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/examining-the-changing/9781522526100/",
          "author": "Annette Lerine Steenkamp",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522526391/",
          "title": "End-User Considerations in Educational Technology Design",
          "url": "https://www.safaribooksonline.com/library/view/end-user-considerations-in/9781522526391/",
          "author": "Ian Douglas",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788294676/",
          "title": "KVM Virtualization Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/kvm-virtualization-cookbook/9781788294676/",
          "author": "Konstantin Ivanov",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781108339094/",
          "title": "Surveys in Combinatorics 2017",
          "url": "https://www.safaribooksonline.com/library/view/surveys-in-combinatorics/9781108339094/",
          "author": "Kitty Meeks",
          "publisher": "Cambridge University Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781108206921/",
          "title": "Collision Phenomena in Liquids and Solids",
          "url": "https://www.safaribooksonline.com/library/view/collision-phenomena-in/9781108206921/",
          "author": "Cameron Tropea",
          "publisher": "Cambridge University Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491977309/",
          "title": "Practical Tableau, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/practical-tableau-1st/9781491977309/",
          "author": "Ryan Sleeper",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491994986/",
          "title": "Enterprise Docker, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/enterprise-docker-1st/9781491994986/",
          "author": "Christopher Tozzi",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491996096/",
          "title": "Collaborative Web Development",
          "url": "https://www.safaribooksonline.com/library/view/collaborative-web-development/9781491996096/",
          "author": "Adam D. Scott",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491995037/",
          "title": "Managing Digital Legacies, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/managing-digital-legacies/9781491995037/",
          "author": "Andrew Kalat",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491934104/",
          "title": "Data Science with Java, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/data-science-with/9781491934104/",
          "author": "Michael R. Brzustowicz",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491953235/",
          "title": "Mastering Feature Engineering",
          "url": "https://www.safaribooksonline.com/library/view/mastering-feature-engineering/9781491953235/",
          "author": "Alice Zheng",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781449325053/",
          "title": "CSS: The Definitive Guide, 4th Edition",
          "url": "https://www.safaribooksonline.com/library/view/css-the-definitive/9781449325053/",
          "author": "Eric A. Meyer",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491924570/",
          "title": "Deep Learning",
          "url": "https://www.safaribooksonline.com/library/view/deep-learning/9781491924570/",
          "author": "Adam Gibson",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781317361756/",
          "title": "Screenwriting for Profit",
          "url": "https://www.safaribooksonline.com/library/view/screenwriting-for-profit/9781317361756/",
          "author": "Andrew Stevens",
          "publisher": "Focal Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788293112/",
          "title": "Ionic : Hybrid Mobile App Development",
          "url": "https://www.safaribooksonline.com/library/view/ionic-hybrid/9781788293112/",
          "author": "Hoc Phan",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134688428/",
          "title": "MCSA 70-742 Cert Guide: Identity with Windows Server 2016",
          "url": "https://www.safaribooksonline.com/library/view/mcsa-70-742-cert/9780134688428/",
          "author": "Benjamin Finkel",
          "publisher": "Pearson IT Certification",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787284944/",
          "title": "Domain-Driven Design in PHP",
          "url": "https://www.safaribooksonline.com/library/view/domain-driven-design-in/9781787284944/",
          "author": "Keyvan Akbary",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785887833/",
          "title": "Building Microservices with .NET Core",
          "url": "https://www.safaribooksonline.com/library/view/building-microservices-with/9781785887833/",
          "author": "Kanwar Manish",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491960103/",
          "title": "Agile Data Science 2.0, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/agile-data-science/9781491960103/",
          "author": "Russell Jurney",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134546988/",
          "title": "R for Everyone: Advanced Analytics and Graphics, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/r-for-everyone/9780134546988/",
          "author": "Jared P. Lander",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787123328/",
          "title": "Practical GIS",
          "url": "https://www.safaribooksonline.com/library/view/practical-gis/9781787123328/",
          "author": "Gábor Farkas",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781317508298/",
          "title": "Acoustics and Psychoacoustics, 5th Edition",
          "url": "https://www.safaribooksonline.com/library/view/acoustics-and-psychoacoustics/9781317508298/",
          "author": "Jamie Angus",
          "publisher": "Focal Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788399708/",
          "title": "Puppet: Mastering Infrastructure Automation",
          "url": "https://www.safaribooksonline.com/library/view/puppet-mastering-infrastructure/9781788399708/",
          "author": "Thomas Uphillis",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134291154/",
          "title": "The Python 3 Standard Library by Example, Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-python-3/9780134291154/",
          "author": "Doug Hellmann",
          "publisher": "Addison-Wesley Professional",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134692319/",
          "title": "CNA Certified Nursing Assistant Exam Cram",
          "url": "https://www.safaribooksonline.com/library/view/cna-certified-nursing/9780134692319/",
          "author": "Marty Walker",
          "publisher": "Pearson IT Certification",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788390552/",
          "title": "Go: Design Patterns for Real-World Projects",
          "url": "https://www.safaribooksonline.com/library/view/go-design-patterns/9781788390552/",
          "author": "Mat Ryer",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134785318/",
          "title": "Logic Pro X 10.3 - Apple Pro Training Series: Professional Music Production",
          "url": "https://www.safaribooksonline.com/library/view/logic-pro-x/9780134785318/",
          "author": "David Nahmani",
          "publisher": "Peachpit Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780128093382/",
          "title": "Software Architecture for Big Data and the Cloud",
          "url": "https://www.safaribooksonline.com/library/view/software-architecture-for/9780128093382/",
          "author": "Bruce Maxim",
          "publisher": "Morgan Kaufmann",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119256212/",
          "title": "Convergence",
          "url": "https://www.safaribooksonline.com/library/view/convergence/9781119256212/",
          "author": "Randy Deutsch",
          "publisher": "John Wiley & Sons",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781634622196/",
          "title": "Data Strategy and the Enterprise Data Executive",
          "url": "https://www.safaribooksonline.com/library/view/data-strategy-and/9781634622196/",
          "author": "Todd Harbour",
          "publisher": "Technics Publications",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788296526/",
          "title": "ASP.NET Core: Cloud-ready, Enterprise Web Application Development",
          "url": "https://www.safaribooksonline.com/library/view/aspnet-core-cloud-ready/9781788296526/",
          "author": "James Singleton",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787288027/",
          "title": "Dart: Scalable Application Development",
          "url": "https://www.safaribooksonline.com/library/view/dart-scalable-application/9781787288027/",
          "author": "Ivo Balbaert",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491943199/",
          "title": "High Performance Spark, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/high-performance-spark/9781491943199/",
          "author": "Holden Karau",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631578670/",
          "title": "The Accelerating TechnOnomic Medium ('ATOM')",
          "url": "https://www.safaribooksonline.com/library/view/the-accelerating-technonomic/9781631578670/",
          "author": "Kartik Gada",
          "publisher": "Business Expert Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631573927/",
          "title": "Decision Support, Analytics, and Business Intelligence, Third Edition",
          "url": "https://www.safaribooksonline.com/library/view/decision-support-analytics/9781631573927/",
          "author": "Ciara Heavin",
          "publisher": "Business Expert Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781492023449/",
          "title": "Gray Hat C#",
          "url": "https://www.safaribooksonline.com/library/view/gray-hat-c/9781492023449/",
          "author": "Brandon Perry",
          "publisher": "No Starch Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788470315/",
          "title": "Deep Learning: Practical Neural Networks with Java",
          "url": "https://www.safaribooksonline.com/library/view/deep-learning-practical/9781788470315/",
          "author": "Alan M. F. Souza",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814438572/",
          "title": "Money Machine",
          "url": "https://www.safaribooksonline.com/library/view/money-machine/9780814438572/",
          "author": "Gary Smith",
          "publisher": "AMACOM",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491932421/",
          "title": "Cloud Foundry: The Definitive Guide, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/cloud-foundry-the/9781491932421/",
          "author": "Duncan C. E. Winn",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134608938/",
          "title": "CCNA Cyber Ops SECOPS 210-255 Official Cert Guide",
          "url": "https://www.safaribooksonline.com/library/view/ccna-cyber-ops/9780134608938/",
          "author": "Stefano De Crescenzo",
          "publisher": "Cisco Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781908043849/",
          "title": "Advanced Windows Memory Dump Analysis with Data Structures, Third Edition",
          "url": "https://www.safaribooksonline.com/library/view/advanced-windows-memory/9781908043849/",
          "author": "Dmitry Vostokov",
          "publisher": "OpenTask",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781292156149/",
          "title": "Investing Demystified, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/investing-demystified-2nd/9781292156149/",
          "author": "Lars Kroijer",
          "publisher": "FT Publishing International",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786464170/",
          "title": "Microsoft Dynamics 365 Extensions Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/microsoft-dynamics-365/9781786464170/",
          "author": "Rami Mounla",
          "publisher": "Packt Publishing",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781484227152/",
          "title": "Xamarin Continuous Integration and Delivery: Team Services, Test Cloud, and HockeyApp",
          "url": "https://www.safaribooksonline.com/library/view/xamarin-continuous-integration/9781484227152/",
          "author": "Gerald Versluis",
          "publisher": "Apress",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119384083/",
          "title": "Results at the Top",
          "url": "https://www.safaribooksonline.com/library/view/results-at-the/9781119384083/",
          "author": "Richard Nesbitt",
          "publisher": "John Wiley & Sons",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781484225882/",
          "title": "Website Hosting and Migration with Amazon Web Services: A Practical Guide to Moving Your Website to AWS",
          "url": "https://www.safaribooksonline.com/library/view/website-hosting-and/9781484225882/",
          "author": "Jason Nadon",
          "publisher": "Apress",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134689227/",
          "title": "MCSA 70-741 Cert Guide: Networking with Windows Server 2016, First Edition",
          "url": "https://www.safaribooksonline.com/library/view/mcsa-70-741-cert/9780134689227/",
          "author": "Michael S. Schulz",
          "publisher": "Pearson IT Certification",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134670584/",
          "title": "IPv6 Fundamentals: A Straightforward Approach to Understanding IPv6, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/ipv6-fundamentals-a/9780134670584/",
          "author": "Rick Graziani",
          "publisher": "Cisco Press",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119365570/",
          "title": "Marketing For Dummies, 5th Edition",
          "url": "https://www.safaribooksonline.com/library/view/marketing-for-dummies/9781119365570/",
          "author": "Jeanette McMurtry",
          "publisher": "John Wiley & Sons",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119362821/",
          "title": "A Practical Guide to Analytics for Governments",
          "url": "https://www.safaribooksonline.com/library/view/a-practical-guide/9781119362821/",
          "author": "Marie Lowman",
          "publisher": "John Wiley & Sons",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119359340/",
          "title": "MCSA Windows Server 2016 Study Guide: Exam 70-740, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/mcsa-windows-server/9781119359340/",
          "author": "William Panek",
          "publisher": "John Wiley & Sons",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781626569027/",
          "title": "Communicate Like a Leader",
          "url": "https://www.safaribooksonline.com/library/view/communicate-like-a/9781626569027/",
          "author": "Dianna Booher",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781626568242/",
          "title": "Collaborating with the Enemy",
          "url": "https://www.safaribooksonline.com/library/view/collaborating-with-the/9781626568242/",
          "author": "Adam Kahane",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781523082735/",
          "title": "Ask Outrageously!",
          "url": "https://www.safaribooksonline.com/library/view/ask-outrageously/9781523082735/",
          "author": "Linda Swindling",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525486/",
          "title": "Handbook of Research on Technology-Centric Strategies for Higher Education Administration",
          "url": "https://www.safaribooksonline.com/library/view/handbook-of-research/9781522525486/",
          "author": "Siran Mukerji",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525288/",
          "title": "Optimizing STEM Education With Advanced ICTs and Simulations",
          "url": "https://www.safaribooksonline.com/library/view/optimizing-stem-education/9781522525288/",
          "author": "Dina Tsybulsky",
          "publisher": "IGI Global",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749480561/",
          "title": "How the Stock Market Works, 6th Edition",
          "url": "https://www.safaribooksonline.com/library/view/how-the-stock/9780749480561/",
          "author": "Michael Becket",
          "publisher": "Kogan Page",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749480202/",
          "title": "How to Pass Numerical Reasoning Tests, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/how-to-pass/9780749480202/",
          "author": "Heidi Smith",
          "publisher": "Kogan Page",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749480189/",
          "title": "How to Pass Advanced Verbal Reasoning Tests, 3rd Edition",
          "url": "https://www.safaribooksonline.com/library/view/how-to-pass/9780749480189/",
          "author": "Mike Bryon",
          "publisher": "Kogan Page",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749478667/",
          "title": "Strategic Internal Communication, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/strategic-internal-communication/9780749478667/",
          "author": "Dr. David Cowan",
          "publisher": "Kogan Page",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749480127/",
          "title": "The Social Organization",
          "url": "https://www.safaribooksonline.com/library/view/the-social-organization/9780749480127/",
          "author": "Dave Ulrich",
          "publisher": "Kogan Page",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749479886/",
          "title": "50 Top Tools for Employee Engagement",
          "url": "https://www.safaribooksonline.com/library/view/50-top-tools/9780749479886/",
          "author": "Debbie Mitchell",
          "publisher": "Kogan Page",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780749479763/",
          "title": "Content - The Atomic Particle of Marketing",
          "url": "https://www.safaribooksonline.com/library/view/content-the/9780749479763/",
          "author": "Rebecca Lieb",
          "publisher": "Kogan Page",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781259861161/",
          "title": "Sell Like a Team: The Blueprint for Building Teams that Win Big at High-Stakes Meetings",
          "url": "https://www.safaribooksonline.com/library/view/sell-like-a/9781259861161/",
          "author": "Michael S. Dalis",
          "publisher": "McGraw-Hill",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442624/",
          "title": "Building Cognitive Applications with IBM Watson Services: Volume 7 Natural Language Understanding",
          "url": "https://www.safaribooksonline.com/library/view/building-cognitive-applications/9780738442624/",
          "author": "Lak Sri",
          "publisher": "IBM Redbooks",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781484212257/",
          "title": "Spring Boot Messaging: Messaging APIs for Enterprise and Integration Solutions",
          "url": "https://www.safaribooksonline.com/library/view/spring-boot-messaging/9781484212257/",
          "author": "Felipe Gutierrez",
          "publisher": "Apress",
          "publishDate": "June 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780814437902/",
          "title": "The Inspiration Code",
          "url": "https://www.safaribooksonline.com/library/view/the-inspiration-code/9780814437902/",
          "author": "Kristi Hedges",
          "publisher": "AMACOM",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631592690/",
          "title": "Pencil Art Workshop",
          "url": "https://www.safaribooksonline.com/library/view/pencil-art-workshop/9781631592690/",
          "author": "Matt Rota",
          "publisher": "Rockport Publishers",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491962435/",
          "title": "Learning HTTP/2, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/learning-http2-1st/9781491962435/",
          "author": "Stephen Ludin",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781784391645/",
          "title": "Mastering PostGIS",
          "url": "https://www.safaribooksonline.com/library/view/mastering-postgis/9781784391645/",
          "author": "Tomasz Nycz",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781784392970/",
          "title": "PostgreSQL 9.6 High Performance",
          "url": "https://www.safaribooksonline.com/library/view/postgresql-96-high/9781784392970/",
          "author": "Gregory Smith",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787127265/",
          "title": "Apache Spark 2.x Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/apache-spark-2x/9781787127265/",
          "author": "Rishi Yadav",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787281349/",
          "title": "Data Lake for Enterprises",
          "url": "https://www.safaribooksonline.com/library/view/data-lake-for/9781787281349/",
          "author": "Pankaj Misra",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786461698/",
          "title": "Mastering macOS Programming",
          "url": "https://www.safaribooksonline.com/library/view/mastering-macos-programming/9781786461698/",
          "author": "Stuart Grimshaw",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786462121/",
          "title": "Raspberry Pi 3 Projects for Java Programmers",
          "url": "https://www.safaribooksonline.com/library/view/raspberry-pi-3/9781786462121/",
          "author": "John Sirach",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788293761/",
          "title": "Essential Angular",
          "url": "https://www.safaribooksonline.com/library/view/essential-angular/9781788293761/",
          "author": "Jeff Cross",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787124004/",
          "title": "Puppet 4.10 Beginner's Guide Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/puppet-410-beginners/9781787124004/",
          "author": "John Arundel",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787125360/",
          "title": "Android System Programming",
          "url": "https://www.safaribooksonline.com/library/view/android-system-programming/9781787125360/",
          "author": "Roger Ye",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786462923/",
          "title": "Learning Docker - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/learning-docker-/9781786462923/",
          "author": "Pethuru Raj",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781783553112/",
          "title": "Python Machine Learning By Example",
          "url": "https://www.safaribooksonline.com/library/view/python-machine-learning/9781783553112/",
          "author": "Yuxi Liu",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786463104/",
          "title": "Building Bots with Microsoft Bot Framework",
          "url": "https://www.safaribooksonline.com/library/view/building-bots-with/9781786463104/",
          "author": "Kishore Gaddam",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780128118795/",
          "title": "Electronics Explained, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/electronics-explained-2nd/9780128118795/",
          "author": "Louis E. Frenzel",
          "publisher": "Newnes",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788394697/",
          "title": "Python: End-to-end Data Analysis",
          "url": "https://www.safaribooksonline.com/library/view/python-end-to-end-data/9781788394697/",
          "author": "Luiz Felipe Martins",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787283367/",
          "title": "Getting Started with Kubernetes - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/getting-started-with/9781787283367/",
          "author": "Jonathan Baier",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119378181/",
          "title": "Startup Opportunities, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/startup-opportunities-2nd/9781119378181/",
          "author": "Sean Wise",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780730343202/",
          "title": "The Lessons School Forgot",
          "url": "https://www.safaribooksonline.com/library/view/the-lessons-school/9780730343202/",
          "author": "Steve Sammartino",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781784393779/",
          "title": "CORS Essentials",
          "url": "https://www.safaribooksonline.com/library/view/cors-essentials/9781784393779/",
          "author": "Randall Goya",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119320937/",
          "title": "Design and Analysis of Experiments, 9th Edition",
          "url": "https://www.safaribooksonline.com/library/view/design-and-analysis/9781119320937/",
          "author": "Douglas C. Montgomery",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786462589/",
          "title": "Python Web Scraping - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/python-web-scraping/9781786462589/",
          "author": "Richard Lawson",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781783555352/",
          "title": "Mastering PostgreSQL 9.6",
          "url": "https://www.safaribooksonline.com/library/view/mastering-postgresql-96/9781783555352/",
          "author": "Hans-Jurgen Schonig",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787285965/",
          "title": "DevOps Bootcamp",
          "url": "https://www.safaribooksonline.com/library/view/devops-bootcamp/9781787285965/",
          "author": "Mitesh Soni",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522522898/",
          "title": "3D Printing and Its Impact on the Production of Fully Functional Components: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/3d-printing-and/9781522522898/",
          "author": "Petar Kocovic",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785885303/",
          "title": "Mastering Rust",
          "url": "https://www.safaribooksonline.com/library/view/mastering-rust/9781785885303/",
          "author": "Vesa Kaihlavirta",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525202/",
          "title": "Handbook of Research on Classroom Diversity and Inclusive Education Practice",
          "url": "https://www.safaribooksonline.com/library/view/handbook-of-research/9781522525202/",
          "author": "Amy J. Petersen",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785888786/",
          "title": "Mastering Ceph",
          "url": "https://www.safaribooksonline.com/library/view/mastering-ceph/9781785888786/",
          "author": "Nick Fisk",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787288409/",
          "title": "Intel Edison Projects",
          "url": "https://www.safaribooksonline.com/library/view/intel-edison-projects/9781787288409/",
          "author": "Avirup Basu",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786467355/",
          "title": "Python Data Structures and Algorithms",
          "url": "https://www.safaribooksonline.com/library/view/python-data-structures/9781786467355/",
          "author": "Benjamin Baka",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787129887/",
          "title": "Build Applications with Meteor",
          "url": "https://www.safaribooksonline.com/library/view/build-applications-with/9781787129887/",
          "author": "Dobrin Ganev",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787126800/",
          "title": "Wordpress Web Application Development - Third Edition",
          "url": "https://www.safaribooksonline.com/library/view/wordpress-web-application/9781787126800/",
          "author": "Rakhitha Nimesh Ratnayake",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787129184/",
          "title": "Working with Linux – Quick Hacks for the Command Line",
          "url": "https://www.safaribooksonline.com/library/view/working-with-linux/9781787129184/",
          "author": "Bogdan Vaida",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134576213/",
          "title": "CCIE Routing and Switching v5.1 Foundations: Bridging the gap between CCNP and CCIE",
          "url": "https://www.safaribooksonline.com/library/view/ccie-routing-and/9780134576213/",
          "author": "Narbik Kocharians",
          "publisher": "Cisco Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785882982/",
          "title": "Learning jQuery 3 - Fifth Edition",
          "url": "https://www.safaribooksonline.com/library/view/learning-jquery-3/9781785882982/",
          "author": "Karl Swedberg",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785881985/",
          "title": "Linux Shell Scripting Cookbook - Third Edition",
          "url": "https://www.safaribooksonline.com/library/view/linux-shell-scripting/9781785881985/",
          "author": "Shantanu Tushar",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787129450/",
          "title": "Python GUI Programming Cookbook - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/python-gui-programming/9781787129450/",
          "author": "Burkhard A. Meier",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785880728/",
          "title": "Building Modern Web Applications Using Angular",
          "url": "https://www.safaribooksonline.com/library/view/building-modern-web/9781785880728/",
          "author": "Shravan Kumar Kasagoni",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788296724/",
          "title": "OpenGL – Build high performance graphics",
          "url": "https://www.safaribooksonline.com/library/view/opengl-build/9781788296724/",
          "author": "William C. Y. Lo",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781782174523/",
          "title": "Learning OpenDaylight",
          "url": "https://www.safaribooksonline.com/library/view/learning-opendaylight/9781782174523/",
          "author": "Reza Toghraee",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785880957/",
          "title": "Learning Android Game Development",
          "url": "https://www.safaribooksonline.com/library/view/learning-android-game/9781785880957/",
          "author": "Nikhil Malankar",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786463388/",
          "title": "Mastering Reactive JavaScript",
          "url": "https://www.safaribooksonline.com/library/view/mastering-reactive-javascript/9781786463388/",
          "author": "Erich de Souza Oliveira",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787120365/",
          "title": "Preventing Digital Extortion",
          "url": "https://www.safaribooksonline.com/library/view/preventing-digital-extortion/9781787120365/",
          "author": "Dhanya Thakkar",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787123502/",
          "title": "User Experience Mapping",
          "url": "https://www.safaribooksonline.com/library/view/user-experience-mapping/9781787123502/",
          "author": "Peter W. Szabo",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787126732/",
          "title": "Hadoop 2.x Administration Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/hadoop-2x-administration/9781787126732/",
          "author": "Gurmukh Singh",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442600/",
          "title": "Building Cognitive Applications with IBM Watson Services: Volume 6 Speech to Text and Text to Speech",
          "url": "https://www.safaribooksonline.com/library/view/building-cognitive-applications/9780738442600/",
          "author": "Lak Sri",
          "publisher": "IBM Redbooks",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787127524/",
          "title": "Learning Social Media Analytics with R",
          "url": "https://www.safaribooksonline.com/library/view/learning-social-media/9781787127524/",
          "author": "Tushar Sharma",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781785288180/",
          "title": "Akka Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/akka-cookbook/9781785288180/",
          "author": "Piyush Mishra",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786467454/",
          "title": "Nmap: Network Exploration and Security Auditing Cookbook - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/nmap-network-exploration/9781786467454/",
          "author": "Paulino Calderon",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787289901/",
          "title": "Reactive Android Programming",
          "url": "https://www.safaribooksonline.com/library/view/reactive-android-programming/9781787289901/",
          "author": "Tadas Subonis",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781260011869/",
          "title": "Truth at Work: The Science of Delivering Tough Messages",
          "url": "https://www.safaribooksonline.com/library/view/truth-at-work/9781260011869/",
          "author": "Mark Murphy",
          "publisher": "McGraw-Hill",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781259835698/",
          "title": "The Native Advertising Advantage: Build Authentic Content that Revolutionizes Digital Marketing and Drives Revenue Growth",
          "url": "https://www.safaribooksonline.com/library/view/the-native-advertising/9781259835698/",
          "author": "Mike Smith",
          "publisher": "McGraw-Hill",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781259862243/",
          "title": "Mapping Innovation: A Playbook for Navigating a Disruptive Age",
          "url": "https://www.safaribooksonline.com/library/view/mapping-innovation-a/9781259862243/",
          "author": "Greg Satell",
          "publisher": "McGraw-Hill",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786463890/",
          "title": "PHP 7 Data Structures and Algorithms",
          "url": "https://www.safaribooksonline.com/library/view/php-7-data/9781786463890/",
          "author": "Mizanur Rahman",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787287907/",
          "title": "Kali Linux Network Scanning Cookbook - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/kali-linux-network/9781787287907/",
          "author": "Justin Hutchens",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781617293740/",
          "title": "CoreOS in Action: Running Applications on Container Linux",
          "url": "https://www.safaribooksonline.com/library/view/coreos-in-action/9781617293740/",
          "author": "Matt Bailey",
          "publisher": "Manning Publications",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786461001/",
          "title": "Mastering Kubernetes",
          "url": "https://www.safaribooksonline.com/library/view/mastering-kubernetes/9781786461001/",
          "author": "Gigi Sayfan",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788297134/",
          "title": "Metasploit Bootcamp",
          "url": "https://www.safaribooksonline.com/library/view/metasploit-bootcamp/9781788297134/",
          "author": "Nipun Jaswal",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631576362/",
          "title": "The Presentation Book for Senior Managers",
          "url": "https://www.safaribooksonline.com/library/view/the-presentation-book/9781631576362/",
          "author": "Jay Surti",
          "publisher": "Business Expert Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781492023401/",
          "title": "Jump Start Adobe XD, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/jump-start-adobe/9781492023401/",
          "author": "Daniel Schwarz",
          "publisher": "SitePoint",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442587/",
          "title": "Building Cognitive Applications with IBM Watson Services: Volume 5 Language Translator",
          "url": "https://www.safaribooksonline.com/library/view/building-cognitive-applications/9780738442587/",
          "author": "Lak Sri",
          "publisher": "IBM Redbooks",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631579448/",
          "title": "MS Excel",
          "url": "https://www.safaribooksonline.com/library/view/ms-excel/9781631579448/",
          "author": "Anurag Singal",
          "publisher": "Business Expert Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781509302154/",
          "title": "Programming for the Internet of Things: Using Windows 10 IoT Core and Azure IoT Suite",
          "url": "https://www.safaribooksonline.com/library/view/programming-for-the/9781509302154/",
          "author": "Dawid Borycki",
          "publisher": "Microsoft Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781783550777/",
          "title": "Mastering Android Game Development with Unity",
          "url": "https://www.safaribooksonline.com/library/view/mastering-android-game/9781783550777/",
          "author": "Wajahat Karim",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787288386/",
          "title": "Learn Python in 7 Days",
          "url": "https://www.safaribooksonline.com/library/view/learn-python-in/9781787288386/",
          "author": "Bhaskar N. Das",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442563/",
          "title": "Building Cognitive Applications with IBM Watson Services: Volume 2 Conversation",
          "url": "https://www.safaribooksonline.com/library/view/building-cognitive-applications/9780738442563/",
          "author": "Lak Sri",
          "publisher": "IBM Redbooks",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631578823/",
          "title": "Basic Cost Benefit Analysis for Assessing Local Public Projects, Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/basic-cost-benefit/9781631578823/",
          "author": "Maryann O. Keating",
          "publisher": "Business Expert Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631577673/",
          "title": "The Human Resource Professional’s Guide to Change Management",
          "url": "https://www.safaribooksonline.com/library/view/the-human-resource/9781631577673/",
          "author": "Melanie J. Peacock",
          "publisher": "Business Expert Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787282896/",
          "title": "Python High Performance - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/python-high-performance/9781787282896/",
          "author": "Gabriele Lanaro",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134685557/",
          "title": "MCSA 70-740 Cert Guide: Installation, Storage, and Compute with Windows Server 2016, First Edition",
          "url": "https://www.safaribooksonline.com/library/view/mcsa-70-740-cert/9780134685557/",
          "author": "Anthony Sequeira",
          "publisher": "Pearson IT Certification",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781449374471/",
          "title": "Android Cookbook, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/android-cookbook-2nd/9781449374471/",
          "author": "Ian F. Darwin",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781562861025/",
          "title": "Unstoppable You: Adopt the New Learning 4.0 Mindset and Change Your Life",
          "url": "https://www.safaribooksonline.com/library/view/unstoppable-you-adopt/9781562861025/",
          "author": "Patricia A. McLagan",
          "publisher": "Association for Talent Development",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781562867775/",
          "title": "Essential Account Planning: 5 Keys for Helping Your Sales Team Drive Revenue",
          "url": "https://www.safaribooksonline.com/library/view/essential-account-planning/9781562867775/",
          "author": "Mark Donnolo",
          "publisher": "Association for Talent Development",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442518/",
          "title": "IBM PowerHA SystemMirror V7.2.1 for IBM AIX Updates",
          "url": "https://www.safaribooksonline.com/library/view/ibm-powerha-systemmirror/9780738442518/",
          "author": "Anthony Steel",
          "publisher": "IBM Redbooks",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781947282711/",
          "title": "Take Control of Pages, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/take-control-of/9781947282711/",
          "author": "Michael E Cohen",
          "publisher": "TidBITS Publishing, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781635761092/",
          "title": "Maria Montessori",
          "url": "https://www.safaribooksonline.com/library/view/maria-montessori/9781635761092/",
          "author": "Rita Kramer",
          "publisher": "Diversion Books",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781631576157/",
          "title": "International Economics, Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/international-economics-second/9781631576157/",
          "author": "Paul Torelli",
          "publisher": "Business Expert Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491960592/",
          "title": "Product Leadership, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/product-leadership-1st/9781491960592/",
          "author": "Martin Eriksson",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491923283/",
          "title": "Spock: Up and Running, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/spock-up-and/9781491923283/",
          "author": "Rob Fletcher",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491980545/",
          "title": "Think Perl 6, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/think-perl-6/9781491980545/",
          "author": "Allen B. Downey",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119152439/",
          "title": "Classification, Parameter Estimation and State Estimation, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/classification-parameter-estimation/9781119152439/",
          "author": "David M. J. Tax",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442570/",
          "title": "Building Cognitive Applications with IBM Watson Services: Volume 3 Visual Recognition",
          "url": "https://www.safaribooksonline.com/library/view/building-cognitive-applications/9780738442570/",
          "author": "Lak Sri",
          "publisher": "IBM Redbooks",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119386315/",
          "title": "3D Printing For Dummies, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/3d-printing-for/9781119386315/",
          "author": "Kalani Kirk Hausman",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119397809/",
          "title": "A Practitioner's Guide to Asset Allocation",
          "url": "https://www.safaribooksonline.com/library/view/a-practitioners-guide/9781119397809/",
          "author": "Harry M. Markowitz",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134544564/",
          "title": "Power of People, The: Learn How Successful Organizations Use Workforce Analytics To Improve Business Performance, 1/e",
          "url": "https://www.safaribooksonline.com/library/view/power-of-people/9780134544564/",
          "author": "Jonathan Ferrar Nigel Guenole Sheri Feinzig",
          "publisher": "Pearson FT Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442617/",
          "title": "Oracle on IBM z Systems",
          "url": "https://www.safaribooksonline.com/library/view/oracle-on-ibm/9780738442617/",
          "author": "Narjisse Zaki",
          "publisher": "IBM Redbooks",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781780173894/",
          "title": "Building A Winning Team: Technical Leadership Capabilities",
          "url": "https://www.safaribooksonline.com/library/view/building-a-winning/9781780173894/",
          "author": "Brian Sutton",
          "publisher": "BCS Learning & Development Limited",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781259860454/",
          "title": "Toyota Kata Culture: Building Organizational Capability and Mindset through Kata Coaching",
          "url": "https://www.safaribooksonline.com/library/view/toyota-kata-culture/9781259860454/",
          "author": "Gerd Aulinger",
          "publisher": "McGraw-Hill",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522524434/",
          "title": "Philosophical Perceptions on Logic and Order",
          "url": "https://www.safaribooksonline.com/library/view/philosophical-perceptions-on/9781522524434/",
          "author": "Jeremy Horne",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781260012071/",
          "title": "The New Fat Flush Foods, 2nd Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-new-fat/9781260012071/",
          "author": "Ann Louise Gittleman",
          "publisher": "McGraw-Hill",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780128042632/",
          "title": "Distributed Generation Systems",
          "url": "https://www.safaribooksonline.com/library/view/distributed-generation-systems/9780128042632/",
          "author": "S. Mohammad Mousavi Agah",
          "publisher": "Butterworth-Heinemann",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786467850/",
          "title": "Implementing Azure Solutions",
          "url": "https://www.safaribooksonline.com/library/view/implementing-azure-solutions/9781786467850/",
          "author": "Oliver Michalski",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522524205/",
          "title": "Assessing and Measuring Statistics Cognition in Higher Education Online Environments: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/assessing-and-measuring/9781522524205/",
          "author": "Zheng Yan",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787284999/",
          "title": "Learning Salesforce Visual Workflow and Process Builder - Second Edition",
          "url": "https://www.safaribooksonline.com/library/view/learning-salesforce-visual/9781787284999/",
          "author": "Rakesh Gupta",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781680452327/",
          "title": "Musical Inventions, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/musical-inventions-1st/9781680452327/",
          "author": "Kathy Ceceri",
          "publisher": "Maker Media, Inc",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788299237/",
          "title": "Mastering Non-Functional Requirements",
          "url": "https://www.safaribooksonline.com/library/view/mastering-non-functional-requirements/9781788299237/",
          "author": "Sameer Paradkar",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781787288287/",
          "title": "Enterprise PowerShell Scripting Bootcamp",
          "url": "https://www.safaribooksonline.com/library/view/enterprise-powershell-scripting/9781787288287/",
          "author": "Brenton J.W. Blawat",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786467133/",
          "title": "Extending Microsoft Dynamics 365 for Operations Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/extending-microsoft-dynamics/9781786467133/",
          "author": "Simon Buxton",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491952955/",
          "title": "Practical Statistics for Data Scientists",
          "url": "https://www.safaribooksonline.com/library/view/practical-statistics-for/9781491952955/",
          "author": "Andrew Bruce",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522524694/",
          "title": "Mobile Platforms, Design, and Apps for Social Commerce",
          "url": "https://www.safaribooksonline.com/library/view/mobile-platforms-design/9781522524694/",
          "author": "Jean-Éric Pelet",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781683180128/",
          "title": "Encouraging Participative Consumerism Through Evolutionary Digital Marketing: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/encouraging-participative-consumerism/9781683180128/",
          "author": "Agapi Manarioti",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522519331/",
          "title": "Discrimination and Diversity: Concepts, Methodologies, Tools, and Applications",
          "url": "https://www.safaribooksonline.com/library/view/discrimination-and-diversity/9781522519331/",
          "author": "Information Resources Management Association",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522523857/",
          "title": "Large-Scale Fuzzy Interconnected Control Systems Design and Analysis",
          "url": "https://www.safaribooksonline.com/library/view/large-scale-fuzzy-interconnected/9781522523857/",
          "author": "Chih-Min Lin",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522524076/",
          "title": "Driving Efficiency in Local Government Using a Collaborative Enterprise Architecture Framework: Emerging Research and Opportunities",
          "url": "https://www.safaribooksonline.com/library/view/driving-efficiency-in/9781522524076/",
          "author": "Amit Tiwary",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522525608/",
          "title": "The Future of Accessibility in International Higher Education",
          "url": "https://www.safaribooksonline.com/library/view/the-future-of/9781522525608/",
          "author": "Jennie Lavine",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781522524267/",
          "title": "Handbook of Research on Collaborative Teaching Practice in Virtual Learning Environments",
          "url": "https://www.safaribooksonline.com/library/view/handbook-of-research/9781522524267/",
          "author": "Maria Guida",
          "publisher": "IGI Global",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491974810/",
          "title": "Designing Bots, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/designing-bots-1st/9781491974810/",
          "author": "Amir Shevat",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781788392976/",
          "title": "Chef: Powerful Infrastructure Automation",
          "url": "https://www.safaribooksonline.com/library/view/chef-powerful-infrastructure/9781788392976/",
          "author": "Earl Waud",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442396/",
          "title": "Implementing the IBM System Storage SAN Volume Controller with IBM Spectrum Virtualize V7.8",
          "url": "https://www.safaribooksonline.com/library/view/implementing-the-ibm/9780738442396/",
          "author": "Paulo Tomiyoshi Takeda",
          "publisher": "IBM Redbooks",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781523082520/",
          "title": "Reinventing Talent Management",
          "url": "https://www.safaribooksonline.com/library/view/reinventing-talent-management/9781523082520/",
          "author": "Edward E. Lawler",
          "publisher": "Berrett-Koehler Publishers",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781632650894/",
          "title": "The Big Book of HR, Revised and Updated Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-big-book/9781632650894/",
          "author": "Cornelia Gamlem",
          "publisher": "Career Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781632650924/",
          "title": "The Essential Social Media Marketing Handbook",
          "url": "https://www.safaribooksonline.com/library/view/the-essential-social/9781632650924/",
          "author": "Gail Z. Martin",
          "publisher": "Career Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119247029/",
          "title": "Big-Data Analytics for Cloud, IoT and Cognitive Computing",
          "url": "https://www.safaribooksonline.com/library/view/big-data-analytics-for/9781119247029/",
          "author": "Min Chen",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491982426/",
          "title": "Securing Node Applications, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/securing-node-applications/9781491982426/",
          "author": "Chetan Karande",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491990728/",
          "title": "Why Elm?",
          "url": "https://www.safaribooksonline.com/library/view/why-elm/9781491990728/",
          "author": "Matthew Griffith",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780081004487/",
          "title": "The Performance of Concentrated Solar Power (CSP) Systems",
          "url": "https://www.safaribooksonline.com/library/view/the-performance-of/9780081004487/",
          "author": "Peter Heller",
          "publisher": "Woodhead Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119094715/",
          "title": "The Complete Direct Investing Handbook",
          "url": "https://www.safaribooksonline.com/library/view/the-complete-direct/9781119094715/",
          "author": "Kirby Rosplock",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781786465184/",
          "title": "Modern C++ Programming Cookbook",
          "url": "https://www.safaribooksonline.com/library/view/modern-c-programming/9781786465184/",
          "author": "Marius Bancila",
          "publisher": "Packt Publishing",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119369042/",
          "title": "Marketing to Millennials For Dummies",
          "url": "https://www.safaribooksonline.com/library/view/marketing-to-millennials/9781119369042/",
          "author": "Corey Padveen",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781947282742/",
          "title": "Take Control of Calendar and Reminders, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/take-control-of/9781947282742/",
          "author": "Scholle McFarland",
          "publisher": "TidBITS Publishing, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491990346/",
          "title": "Organizational Design for Teams, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/organizational-design-for/9781491990346/",
          "author": "O'Reilly Media, Inc.",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781632650825/",
          "title": "The Financial Aid Handbook, Revised Edition",
          "url": "https://www.safaribooksonline.com/library/view/the-financial-aid/9781632650825/",
          "author": "Ruth Vedvik",
          "publisher": "Career Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781119277415/",
          "title": "CCSP (ISC)2 Certified Cloud Security Professional Official Study Guide",
          "url": "https://www.safaribooksonline.com/library/view/ccsp-isc2-certified/9781119277415/",
          "author": "Ben Malisow",
          "publisher": "John Wiley & Sons",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491990735/",
          "title": "Breaking Data Science Open, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/breaking-data-science/9781491990735/",
          "author": "Christine Doig",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491935941/",
          "title": "Modern Linux Administration",
          "url": "https://www.safaribooksonline.com/library/view/modern-linux-administration/9781491935941/",
          "author": "Sam R. Alapati",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491964835/",
          "title": "Solutions Architecture",
          "url": "https://www.safaribooksonline.com/library/view/solutions-architecture/9781491964835/",
          "author": "Ted Malaska",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780738442556/",
          "title": "POWER8 High-performance Computing Guide IBM Power System S822LC (8335-GTB) Edition",
          "url": "https://www.safaribooksonline.com/library/view/power8-high-performance-computing/9780738442556/",
          "author": "Alexander Pozdneev",
          "publisher": "IBM Redbooks",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781260011388/",
          "title": "OCA Java SE 8 Programmer I Exam Guide (Exams 1Z0-808)",
          "url": "https://www.safaribooksonline.com/library/view/oca-java-se/9781260011388/",
          "author": "Bert Bates",
          "publisher": "McGraw-Hill",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134673226/",
          "title": "NCLEX-PN®",
          "url": "https://www.safaribooksonline.com/library/view/nclex-pn/9780134673226/",
          "author": "Clara Hurd",
          "publisher": "Pearson IT Certification",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781351814829/",
          "title": "Investing in Movies",
          "url": "https://www.safaribooksonline.com/library/view/investing-in-movies/9781351814829/",
          "author": "Joseph N. Cohen",
          "publisher": "Focal Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781491954614/",
          "title": "Learning React, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/learning-react-1st/9781491954614/",
          "author": "Alex Banks",
          "publisher": "O'Reilly Media, Inc.",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781617293634/",
          "title": "Learn Cisco Network Administration in a Month of Lunches",
          "url": "https://www.safaribooksonline.com/library/view/learn-cisco-network/9781617293634/",
          "author": "Ben Piper",
          "publisher": "Manning Publications",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9781492020370/",
          "title": "Coding iPhone Apps for Kids, 1st Edition",
          "url": "https://www.safaribooksonline.com/library/view/coding-iphone-apps/9781492020370/",
          "author": "Matt McCarthy",
          "publisher": "No Starch Press",
          "publishDate": "May 2017"
        },
        {
          "cover": "https://www.safaribooksonline.com/library/cover/9780134778167/",
          "title": "Java® 9 for Programmers, Fourth Edition",
          "url": "https://www.safaribooksonline.com/library/view/java-9-for/9780134778167/",
          "author": "Harvey Deitel",
          "publisher": "Prentice Hall",
          "publishDate": "May 2017"
        }
      ]
    );
  }
}
