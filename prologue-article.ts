import { ArticleWithRelations } from './lib/data';

const PROLOGUE_ARTICLE: ArticleWithRelations = {
  id: '0',
  title: 'Prologue',
  content:
    '## About Me and This Project\nHi there, I’m Shagara, and I’m a frontend developer trying to navigate my way into fullstack development. I wouldn’t call myself an expert by any means, but I’m someone who’s willing to learn, adapt, and improve with every step I take. This journey hasn’t always been easy, and there’s still a lot I don’t know, but I’m determined to keep going.\n\nThis project, Next Blog CMS, is a reflection of that mindset. It’s a simple content management system that I built using Next.js App Router along with some other tools like TypeScript, NextAuth, Prisma ORM, and TailwindCSS. While it’s not perfect, it represents a significant milestone in my learning process, and I’m proud of what I’ve accomplished so far.\n\n## Why I Built This\nHonestly, I built this project because I wanted to challenge myself. As someone who’s been more comfortable on the frontend, diving into backend concepts like database management and authentication was intimidating. But I knew I couldn’t grow if I stayed in my comfort zone. With Next Blog CMS, I’ve managed to create an application that allows users to browse and read articles while giving administrators the tools to manage content effectively.\n\n## Looking Ahead\nI’ll admit, there’s still so much I want to improve in this project. I’d love to add features like image uploads, a commenting system, and maybe even the ability to like articles and comments. I’m also trying to make the user interface more polished and intuitive. It feels like every time I learn something new, I realize just how much more there is to learn—but that’s what keeps me motivated.\n\n## What I’ve Learned\nThis project has taught me more than I expected. From managing databases with Prisma to setting up authentication with NextAuth, I’ve been pushed out of my comfort zone repeatedly. Deploying the app using Vercel and Railway.app was another learning curve, but it feels rewarding to see the app live and functioning.\n\n## Thank You for Visiting\nIf you’ve made it this far, thank you for taking the time to read about me and my project. I know it’s not groundbreaking, but it’s a step forward for me, and that means a lot. If you have any feedback or just want to chat, feel free to reach out at shagaranst@gmail.com. I’d be happy to hear from you.\n\nThanks again for stopping by. I hope this project inspires you—or at least makes you feel like learning and improving is worth it, even when it feels hard.',
  authorId: 'cm4l68v3t0000zwomfgge3wgp',
  createdAt: '2024-12-25T03:52:01.639Z',
  updatedAt: '2024-12-25T04:00:31.313Z',
  author: {
    id: 'cm4l68v3t0000zwomfgge3wgp',
    name: 'Admin 1',
    email: 'admin@test.com',
  },
  images: [],
};

export default PROLOGUE_ARTICLE;
