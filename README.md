# ChatUIX - Interactive Chat UI Generator

A Next.js chatbot application that generates interactive UI elements directly within the chat interface. Users can interact with dynamic components like forms, tables, charts, and cards without leaving the conversation.

## 🚀 Live Demo

**Production URL:** https://agentic-063a671f.vercel.app

## ✨ Features

### Core Capabilities
- **Interactive Chat Interface**: Real-time conversation with AI-powered responses
- **Dynamic UI Component Generation**: The chatbot generates interactive UI elements inline
- **Event Handling**: User interactions are captured and processed within the chat context
- **Multi-Step Flows**: Support for complex workflows like booking appointments or form submissions
- **State Management**: Maintains conversation context across interactions

### Supported UI Components

1. **Buttons** - Action triggers with different variants (primary, secondary, danger)
2. **Input Fields** - Text inputs with real-time submission
3. **Forms** - Multi-field forms with validation
4. **Tables** - Data tables with headers and rows
5. **Charts** - Interactive visualizations (line, bar, pie charts)
6. **Cards** - Content cards with action buttons
7. **Lists** - Ordered and unordered lists
8. **Dropdowns** - Select menus with options

## 🎯 Use Cases

Try these example commands in the chat:

- "Create a signup form"
- "Show sales data in a table"
- "Generate a bar chart"
- "Display product cards"
- "Create a survey"
- "Book an appointment"
- "Make a calculator"

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Architecture

### Frontend (`app/`)
- **page.tsx** - Main chat interface with message display and input
- **components/ChatMessage.tsx** - Individual message component
- **components/UIRenderer.tsx** - Dynamic UI component renderer
- **types.ts** - TypeScript type definitions

### Backend (`app/api/`)
- **chat/route.ts** - API endpoint that processes messages and generates UI component instructions

### Flow
1. User sends a message
2. Message is sent to `/api/chat` endpoint
3. Backend analyzes the message and determines appropriate UI components
4. Response includes text content and component definitions
5. Frontend renders the text and interactive UI elements
6. User interactions trigger new messages with action data
7. Backend processes actions and updates conversation state

## 🎨 Component System

Each UI component is defined by a type and properties:

```typescript
{
  type: 'button' | 'input' | 'form' | 'table' | 'chart' | 'card' | 'list' | 'select',
  // Component-specific properties
  action: string, // Callback identifier
  // ... other properties
}
```

Actions are handled by the backend, which maintains conversation context and generates appropriate responses.

## 🔄 State Management

The chatbot maintains context across messages:
- Form data from previous interactions
- Multi-step workflow progress
- Calculator state
- Booking information
- User preferences

## 🚢 Deployment

Deployed on Vercel with automatic builds from the main branch.

```bash
vercel deploy --prod
```

## 📝 License

MIT

## 🤝 Contributing

This is a proof-of-concept project demonstrating inline UI generation in chat interfaces.
