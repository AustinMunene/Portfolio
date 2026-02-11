import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications",
    content: `
      <p>Modern web development has evolved significantly over the years. Today, developers have access to powerful tools and frameworks that make building web applications more efficient and enjoyable.</p>
      
      <h2>The Rise of Component-Based Architecture</h2>
      <p>One of the most significant changes in web development is the adoption of component-based architecture. Frameworks like React, Vue, and Angular have made it easier to build complex user interfaces by breaking them down into reusable components.</p>
      
      <h2>Performance Optimization</h2>
      <p>Performance is crucial for modern web applications. Users expect fast loading times and smooth interactions. Here are some key strategies for optimizing web application performance:</p>
      <ul>
        <li>Code splitting and lazy loading</li>
        <li>Image optimization</li>
        <li>Caching strategies</li>
        <li>Minification and bundling</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building modern web applications requires a good understanding of both frontend and backend technologies. By staying up to date with the latest trends and best practices, developers can create better web experiences for users.</p>
    `,
    date: "April 14, 2024",
    readTime: "5 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "The Future of AI in Software Development",
    content: `
      <p>Artificial Intelligence is revolutionizing the software development landscape, introducing new tools and methodologies that are changing how we write, test, and deploy code.</p>
      
      <h2>AI-Powered Code Generation</h2>
      <p>Tools like GitHub Copilot and Amazon CodeWhisperer are transforming the coding experience by providing intelligent code suggestions and completions. These AI assistants can help developers write code faster and with fewer errors.</p>
      
      <h2>Automated Testing and Quality Assurance</h2>
      <p>AI is also making waves in the testing space. Machine learning algorithms can now generate test cases, identify potential bugs, and even suggest fixes for common issues. This automation allows developers to focus on more complex problems.</p>
      
      <h2>The Impact on Developer Workflows</h2>
      <p>While AI won't replace developers anytime soon, it will significantly change how we work. Developers will need to adapt to these new tools and learn how to effectively collaborate with AI systems to maximize productivity.</p>
      
      <h2>Conclusion</h2>
      <p>The integration of AI into software development is still in its early stages, but the potential is enormous. By embracing these technologies, developers can work more efficiently and focus on solving more complex problems.</p>
    `,
    date: "April 10, 2024",
    readTime: "7 min read",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "Creating Responsive UIs with Tailwind CSS",
    content: `
      <p>Tailwind CSS has revolutionized the way we build user interfaces, offering a utility-first approach that makes creating responsive designs faster and more consistent.</p>
      
      <h2>The Utility-First Approach</h2>
      <p>Unlike traditional CSS frameworks, Tailwind doesn't provide pre-built components. Instead, it offers a set of utility classes that you can combine to create custom designs. This approach gives you more flexibility and control over your UI.</p>
      
      <h2>Responsive Design Made Easy</h2>
      <p>Tailwind's responsive design utilities make it simple to create layouts that work well on all screen sizes. By using responsive prefixes like <code>sm:</code>, <code>md:</code>, and <code>lg:</code>, you can easily adjust styles based on viewport width.</p>
      
      <h2>Dark Mode Support</h2>
      <p>With the <code>dark:</code> variant, you can create dark mode versions of your UI with minimal effort. This is particularly useful for creating accessible designs that respect user preferences.</p>
      
      <h2>Conclusion</h2>
      <p>Tailwind CSS has become an essential tool for modern web development, offering a flexible and efficient way to build responsive user interfaces. By mastering Tailwind, you can create beautiful designs faster and with less code.</p>
    `,
    date: "April 5, 2024",
    readTime: "6 min read",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    title: "TypeScript: Why You Should Use It",
    content: `
      <p>TypeScript has become an essential tool in modern web development, offering a powerful type system that helps catch errors early and improve code quality.</p>
      
      <h2>Static Typing for JavaScript</h2>
      <p>TypeScript adds static typing to JavaScript, allowing you to catch type-related errors during development rather than at runtime. This leads to more robust code and fewer bugs in production.</p>
      
      <h2>Enhanced IDE Support</h2>
      <p>With TypeScript, you get better code completion, inline documentation, and refactoring tools in your IDE. This improves developer productivity and makes it easier to work with large codebases.</p>
      
      <h2>Better Object-Oriented Programming</h2>
      <p>TypeScript supports modern JavaScript features and adds additional object-oriented programming capabilities like interfaces, generics, and access modifiers. This makes it easier to write and maintain complex applications.</p>
      
      <h2>Conclusion</h2>
      <p>Whether you're building a small project or a large-scale application, TypeScript can help you write better code with fewer bugs. Its type system and enhanced tooling make it an invaluable addition to your development workflow.</p>
    `,
    date: "March 28, 2024",
    readTime: "4 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 5,
    title: "Building a Portfolio That Stands Out",
    content: `
      <p>Your portfolio is often the first impression potential employers or clients will have of your work. Creating a standout portfolio is essential for showcasing your skills and attracting opportunities.</p>
      
      <h2>Showcase Your Best Work</h2>
      <p>Focus on quality over quantity. Select projects that demonstrate your technical skills, problem-solving abilities, and design aesthetic. Make sure each project tells a story about your approach and the challenges you overcame.</p>
      
      <h2>Tell Your Story</h2>
      <p>Your portfolio should reflect your personality and professional journey. Include a compelling about section that explains your background, skills, and what drives you as a developer.</p>
      
      <h2>Make It Interactive</h2>
      <p>Consider adding interactive elements to your portfolio to demonstrate your technical abilities. This could include animations, interactive demos of your projects, or even small games or tools that showcase your skills.</p>
      
      <h2>Conclusion</h2>
      <p>A well-designed portfolio can be the difference between landing your dream job or client and being overlooked. Take the time to create something that truly represents your skills and personality.</p>
    `,
    date: "March 20, 2024",
    readTime: "8 min read",
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 6,
    title: "The Rise of Web Components",
    content: `
      <p>Web Components are a set of web platform APIs that allow you to create reusable, encapsulated HTML elements. They represent a significant shift in how we build web applications.</p>
      
      <h2>What Are Web Components?</h2>
      <p>Web Components consist of three main technologies: Custom Elements, Shadow DOM, and HTML Templates. Together, they allow you to create custom HTML elements that can be reused across different projects and frameworks.</p>
      
      <h2>Benefits of Web Components</h2>
      <p>Web Components offer several advantages over traditional component libraries:</p>
      <ul>
        <li>Framework independence</li>
        <li>Better performance</li>
        <li>Native browser support</li>
        <li>Encapsulated styling and behavior</li>
      </ul>
      
      <h2>The Future of Web Development</h2>
      <p>As browser support for Web Components continues to improve, we're likely to see more adoption across the industry. Major companies like Google, Microsoft, and Adobe are already using Web Components in their products.</p>
      
      <h2>Conclusion</h2>
      <p>Web Components represent the future of web development, offering a standardized way to create reusable UI elements. By learning and adopting Web Components, you'll be better prepared for the future of the web.</p>
    `,
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 7,
    title: "Mastering Cypress: Best Practices for Automation Testing",
    content: `
      <p>Automation testing has become an essential part of modern software development. Cypress, a popular JavaScript-based end-to-end testing framework, stands out for its speed, ease of use, and rich developer experience.</p>
  
      <h2>Why Cypress?</h2>
      <p>Cypress allows QA engineers and developers to write reliable, maintainable, and fast tests for anything that runs in the browser. With real-time reloads, easy debugging, and a powerful test runner, it's become a favorite in the testing community.</p>
  
      <h2>Best Practices for Using Cypress</h2>
      <ul>
        <li><strong>1. Keep Tests Independent:</strong> Ensure tests don't rely on the state created by other tests. Reset state between test cases using <code>beforeEach()</code>.</li>
        <li><strong>2. Use <code>data-*</code> Attributes:</strong> Instead of relying on classes or IDs that may change, use stable <code>data-cy</code> attributes for selecting DOM elements.</li>
        <li><strong>3. Avoid Flaky Tests:</strong> Make use of Cypress retry-ability and avoid arbitrary waits. Prefer commands like <code>cy.get(...).should('be.visible')</code>.</li>
        <li><strong>4. Use Custom Commands:</strong> Abstract repeated actions like login or navigation into custom commands using <code>Cypress.Commands.add()</code>.</li>
        <li><strong>5. Organize Test Files:</strong> Keep your test files modular and group related tests into folders for maintainability.</li>
      </ul>
  
      <h2>Example Login Test</h2> 
      <pre><code class="language-js">
  describe("Login Test", () => {
    it("logs in with valid credentials", () => {
      cy.visit("/login");
      cy.get('[data-cy=username]').type("user123");
      cy.get('[data-cy=password]').type("password123");
      cy.get('[data-cy=submit]').click();
      cy.url().should("include", "/dashboard");
    });
  });
      </code></pre>
  
      <h2>Bonus Tips</h2>
      <ul>
        <li>Leverage the <code>cypress-axe</code> plugin for accessibility testing.</li>
        <li>Record videos/screenshots on test failure for easier debugging.</li>
        <li>Integrate Cypress with GitHub Actions or other CI tools for continuous feedback.</li>
      </ul>
  
      <h2>Conclusion</h2>
      <p>Using Cypress effectively can significantly boost confidence in your web app. By following these best practices, you ensure your tests remain reliable, readable, and robust as your application scales. Explore my <a href="/interactive">interactive demo section</a> for a live Cypress simulation!</p>
    `,
    date: "April 14, 2024",
    readTime: "7 min read",
    category: "QA & Testing",
    imageUrl: "https://zkiwxxithffuxbkdolxs.supabase.co/storage/v1/object/sign/images/Add-a-heading-4.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQWRkLWEtaGVhZGluZy00LmpwZyIsImlhdCI6MTc0NDczODQwMSwiZXhwIjoyMDYwMDk4NDAxfQ.PU7MYBK0WYVJTE_9iticRE0pTbXrijeaHptt5jzKHRU"
  },
];

const categoryColors: Record<string, string> = {
  Development: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
  AI: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  Design: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Career: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  'QA & Testing': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.id === Number(id));

  if (!post) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 gradient-text">Post Not Found</h1>
            <button
              onClick={() => navigate('/blog')}
              className="text-accent-400 hover:text-accent-300 transition-colors"
            >
              ← Back to Blog
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent-600/8 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-gray-400 hover:text-accent-400 transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>

          <div className="relative h-80 md:h-96 mb-8 rounded-2xl overflow-hidden border border-white/[0.06]">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs border ${categoryColors[post.category] || 'bg-white/10 text-white border-white/10'}`}>
                {post.category}
              </span>
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-500 mb-4">
            <span>{post.date}</span>
            <span className="mx-2 text-accent-500/30">|</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">{post.title}</h1>

          <div
            className="prose prose-invert prose-headings:text-white prose-a:text-accent-400 prose-a:no-underline hover:prose-a:text-accent-300 prose-code:text-accent-300 prose-strong:text-white max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost;
