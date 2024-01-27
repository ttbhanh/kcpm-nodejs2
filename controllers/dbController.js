const controller = {};

controller.createDatabase = async () => {
  const models = require("../models");

  // Create Tables
  console.log("Creating tables...");
  await models.sequelize.sync();
  console.log("Tables created!");

  // Check data exist
  const data = await models.Article.findAll();
  if (data.length) {
    console.log("Data exist!");
    return;
  }

  // Import data
  console.log("Importing data...");
  const articles = [
    {
      title: "Design Research",
      imagepath: "/images/design.jpg",
      summary:
        "We help you better understand the needs and goals of your customers, uncovering key insights that drive innovative design ideas.",
      description: `<p>
              At NodeJS, our mission is to assist you in gaining a profound understanding of your customers' needs and aspirations. Through our comprehensive design research services, we delve deep into their motivations and preferences, unearthing valuable insights that fuel the development of groundbreaking design concepts. By employing a range of methodologies, including interviews, surveys, observations, and usability testing, we gather a rich tapestry of data that illuminates the unique perspectives of your target audience.
              </p>
              <p>
              Our skilled team of researchers employs a human-centered approach, placing the end-users at the core of our investigations. We believe that by empathizing with your customers and comprehending their pain points, desires, and goals, we can create truly transformative design solutions. Through our meticulous analysis of the data collected, we distill actionable findings that drive innovation and guide the design process.
              </p>
              <p>
              With our expertise in qualitative and quantitative research methods, we uncover both explicit and implicit customer needs, enabling you to make informed decisions and stay ahead of the competition. By conducting thorough market analyses, trend research, and competitive benchmarking, we provide you with a comprehensive understanding of the design landscape, empowering you to make strategic choices that resonate with your customers.
              </p>
              <p>
              Our collaborative approach ensures that you are actively involved in the research process. We value your insights and expertise, and our findings serve as a foundation for meaningful conversations, leading to the co-creation of impactful design ideas. Together, we can transform these insights into tangible products and services that exceed customer expectations and elevate your brand in the marketplace.
              </p>
              <p>
              At NodeJS, we are passionate about delivering design research that uncovers the essence of your customers' desires, helping you forge stronger connections with your audience and drive innovation within your organization. Let us guide you on this enlightening journey of discovery and design excellence.
              </p>`,
    },
    {
      title: "Web & Mobile",
      imagepath: "/images/mobile.png",
      summary:
        "We design desktop and tablet websites, mobile websites, mobile apps, and other screen based user experiences.",
      description: `<p>At NodeJS, we specialize in crafting exceptional user experiences across various screen sizes and devices. Our expertise lies in designing visually appealing and user-friendly desktop and tablet websites, mobile websites, mobile apps, and other screen-based applications. 
              </p><p>
              Whether your target audience interacts with your brand through a desktop computer, a tablet, or a smartphone, we ensure that their journey is seamless and engaging. Our team of skilled designers and developers possesses a deep understanding of responsive design principles, allowing us to create websites and applications that adapt flawlessly to different screen resolutions.
              </p><p>
              We believe that a well-designed web and mobile presence is crucial for your success in today's digital landscape. Our approach combines aesthetics with functionality, providing users with intuitive interfaces and delightful interactions. Through careful consideration of user behavior and preferences, we create designs that not only captivate your audience but also drive conversions and achieve your business goals.
              </p><p>
              Our design process begins with in-depth research and analysis, where we immerse ourselves in your brand identity, target audience, and industry trends. This foundation enables us to create tailor-made solutions that resonate with your users and set you apart from competitors. From wireframing and prototyping to visual design and development, we ensure a comprehensive and cohesive user experience across all platforms.
              </p><p>
              Collaboration is at the heart of our work. We value your input and insights, integrating your brand guidelines and vision into our designs. Our iterative approach involves regular feedback loops and user testing, allowing us to refine and enhance the user experience based on real-world insights.
              </p><p>
              At NodeJS, we are passionate about delivering web and mobile solutions that not only meet but exceed expectations. Whether you need a website that showcases your products or a mobile app that enhances customer engagement, we are dedicated to creating digital experiences that leave a lasting impression on your audience. Partner with us to unlock the full potential of your web and mobile presence.</p>`,
    },
    {
      title: "Usability",
      imagepath: "/images/usability.jpg",
      summary:
        "We evaluate the success of an experience by testing it with real people. Our usability lab is equipped for desktop and mobile testing.",
      description: `<p>At NodeJs, we understand that the success of any user experience hinges on its usability. That's why we offer comprehensive usability evaluation services, where we put your product or service to the test with real people. Our state-of-the-art usability lab is fully equipped to conduct testing on both desktop and mobile platforms, ensuring that we can assess the effectiveness and efficiency of your digital experiences across various devices.
              </p><p>
              Our usability testing process involves recruiting representative users who match your target audience. We carefully design test scenarios and tasks that reflect real-world scenarios, allowing us to observe how users interact with your product or service. By closely observing their behaviors, actions, and feedback, we gain invaluable insights into areas of improvement and identify potential usability challenges.
              </p><p>
              Using a combination of qualitative and quantitative research methods, we collect data on user satisfaction, task completion rates, and time taken to accomplish specific objectives. We analyze this data meticulously, providing you with detailed reports and actionable recommendations that highlight areas for enhancement. Our goal is to bridge the gap between your intended user experience and the actual user experience, ensuring that your product or service meets user expectations and achieves your business goals.
              </p><p>
              Our usability lab is designed to facilitate a comfortable and distraction-free environment for participants. We utilize cutting-edge technology to capture user interactions, eye movements, and facial expressions, enabling us to gain deeper insights into user behavior and emotional responses. This comprehensive approach allows us to uncover usability issues and gather rich qualitative data that informs the design process.
              </p><p>
              By incorporating usability testing into your product development lifecycle, you can make informed design decisions, mitigate usability risks, and create experiences that resonate with your users. Our experienced team of usability experts will guide you through the entire process, providing expert insights and recommendations based on industry best practices and user-centered design principles.
              </p><p>
              At NodeJS, we are dedicated to helping you optimize the usability of your digital experiences. Partner with us to ensure that your product or service is intuitive, efficient, and enjoyable for your target audience. Together, we can create experiences that not only meet user needs but also exceed their expectations.</p>`,
    },
    {
      title: "Our Mission",
      imagepath: "/images/mission.jpeg",
      summary:
        "Our mission is to provide exceptional customer support while driving innovation through design research and delivering user-friendly web and mobile experiences.",
      description: `Our mission is to empower businesses by offering a comprehensive range of services. We are dedicated to providing exceptional customer support, ensuring prompt assistance and proactive engagement to exceed customer expectations. Through our design research expertise, we uncover key insights that drive innovative ideas, enabling businesses to better understand their customers' needs and goals. Additionally, our web and mobile design services focus on creating visually appealing and user-friendly experiences across various devices, while our usability evaluations aim to optimize the effectiveness and efficiency of digital products. By combining these pillars, our mission is to help businesses thrive by delivering outstanding support, user-centric designs, and actionable research insights.`,
    },
    {
      title: "Customer Support",
      imagepath: "/images/customer.jpg",
      summary:
        "We provide exceptional customer support, prioritizing prompt assistance and proactive engagement to exceed expectations.",
      description: `At NodeJs, we recognize the critical role of customer support in building strong relationships and fostering customer loyalty. Our customer support services are designed to provide exceptional assistance and ensure that your customers have a positive experience when engaging with your brand.
              </p><p>
              Our dedicated customer support team is trained to handle inquiries, concerns, and issues promptly and professionally. We prioritize clear and effective communication, ensuring that your customers receive the support they need in a timely manner. Whether it's through phone, email, live chat, or social media, we are equipped to offer multi-channel support to cater to the preferences of your diverse customer base.
              </p><p>
              We believe in going the extra mile to exceed customer expectations. Our customer support agents are not only knowledgeable about your products or services but are also skilled in empathy and problem-solving. We strive to understand your customers' needs and concerns fully, allowing us to provide personalized and tailored solutions. Our goal is to turn every customer interaction into a positive and satisfying experience.
              </p><p>
              In addition to providing reactive support, we also emphasize proactive customer engagement. We actively seek feedback from your customers, using surveys and other feedback mechanisms to understand their satisfaction levels and identify areas for improvement. By proactively addressing potential issues and taking steps to enhance the overall customer experience, we help you build long-lasting customer relationships.
              </p><p>
              We leverage technology to streamline and enhance our customer support operations. Our advanced ticketing and CRM systems enable us to efficiently manage customer inquiries, track support history, and provide seamless service across multiple touchpoints. This technology-driven approach allows us to deliver consistent and personalized support experiences to your customers.
              </p><p>
              At NodejS, we understand that exceptional customer support is integral to your success. By partnering with us, you can focus on your core business while entrusting the critical task of customer support to our capable team. Together, we can deliver outstanding support that not only resolves issues but also builds trust, loyalty, and customer advocacy for your brand.</p>`,
    },
  ];
  await models.Article.bulkCreate(articles);
  console.log("Data imported!");

  // Create Administration Account
  console.log("Creating Admininstration User Account...");
  const bcrypt = require("bcrypt");
  const password = bcrypt.hashSync("Admin@123", bcrypt.genSaltSync(10));
  const user = await models.User.findOne({ where: { username: "admin" } });
  if (!user) {
    await models.User.create({
      username: "admin",
      password,
      isAdmin: true,
    });
  } else {
    await models.User.update(
      {
        password,
        isAdmin: "true",
      },
      {
        where: {
          username: "admin",
        },
      }
    );
  }
  console.log(
    "Administration Account created! Username: admin, Password: Admin@123"
  );
};

module.exports = controller;
