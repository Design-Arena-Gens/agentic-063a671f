import { NextRequest, NextResponse } from 'next/server';
import { Message, UIComponent } from '@/app/types';

// Simulated LLM that generates UI components based on user input
// In production, this would call OpenAI or another LLM API
function generateResponse(messages: Message[], context: Record<string, any>, action?: string, actionData?: any): {
  content: string;
  components?: UIComponent[];
  context: Record<string, any>;
} {
  const lastMessage = messages[messages.length - 1];
  const userMessage = lastMessage.content.toLowerCase();

  // Handle action callbacks
  if (action) {
    return handleAction(action, actionData, context);
  }

  // Form generation
  if (userMessage.includes('form') || userMessage.includes('signup') || userMessage.includes('register')) {
    return {
      content: "I've created a signup form for you. Fill it out and I'll process your registration!",
      components: [
        {
          type: 'form',
          fields: [
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
          ],
          submitLabel: 'Sign Up',
          action: 'submit_signup',
        }
      ],
      context: { ...context, formType: 'signup' }
    };
  }

  // Table generation
  if (userMessage.includes('table') || userMessage.includes('data') || userMessage.includes('list')) {
    return {
      content: "Here's a sample sales data table showing our top products:",
      components: [
        {
          type: 'table',
          caption: 'Q4 2024 Sales Performance',
          headers: ['Product', 'Units Sold', 'Revenue', 'Growth'],
          rows: [
            ['Product A', '1,234', '$45,678', '+15%'],
            ['Product B', '987', '$32,450', '+8%'],
            ['Product C', '1,567', '$67,890', '+23%'],
            ['Product D', '654', '$21,234', '-5%'],
            ['Product E', '2,345', '$89,012', '+45%'],
          ]
        }
      ],
      context
    };
  }

  // Chart generation
  if (userMessage.includes('chart') || userMessage.includes('graph') || userMessage.includes('visualize')) {
    const chartType = userMessage.includes('pie') ? 'pie' : userMessage.includes('line') ? 'line' : 'bar';
    
    return {
      content: `Here's a ${chartType} chart visualizing monthly revenue data:`,
      components: [
        {
          type: 'chart',
          chartType,
          title: 'Monthly Revenue 2024',
          data: [
            { name: 'Jan', value: 4000 },
            { name: 'Feb', value: 3000 },
            { name: 'Mar', value: 5000 },
            { name: 'Apr', value: 4500 },
            { name: 'May', value: 6000 },
            { name: 'Jun', value: 5500 },
          ],
          xKey: 'name',
          yKey: 'value'
        }
      ],
      context
    };
  }

  // Card generation
  if (userMessage.includes('card') || userMessage.includes('product') || userMessage.includes('item')) {
    return {
      content: "Here are some product cards you might be interested in:",
      components: [
        {
          type: 'card',
          title: 'Premium Plan',
          content: 'Get access to all features including advanced analytics, priority support, and unlimited storage.',
          actions: [
            { label: 'Learn More', action: 'learn_more_premium' },
            { label: 'Buy Now', action: 'buy_premium' }
          ]
        },
        {
          type: 'card',
          title: 'Basic Plan',
          content: 'Perfect for getting started with essential features and 10GB storage.',
          actions: [
            { label: 'Learn More', action: 'learn_more_basic' },
            { label: 'Buy Now', action: 'buy_basic' }
          ]
        }
      ],
      context
    };
  }

  // Survey/feedback
  if (userMessage.includes('survey') || userMessage.includes('feedback') || userMessage.includes('rating')) {
    return {
      content: "I'd love to hear your feedback! Please rate your experience:",
      components: [
        {
          type: 'select',
          label: 'How would you rate your experience?',
          options: [
            { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
            { value: '4', label: '⭐⭐⭐⭐ Good' },
            { value: '3', label: '⭐⭐⭐ Average' },
            { value: '2', label: '⭐⭐ Poor' },
            { value: '1', label: '⭐ Very Poor' },
          ],
          action: 'submit_rating'
        },
        {
          type: 'input',
          label: 'Additional Comments',
          placeholder: 'Tell us more...',
          inputType: 'text',
          action: 'submit_comment'
        }
      ],
      context
    };
  }

  // Calculator/tools
  if (userMessage.includes('calculator') || userMessage.includes('calculate') || userMessage.includes('compute')) {
    return {
      content: "Here's a simple calculator. Enter numbers and I'll help you compute:",
      components: [
        {
          type: 'input',
          label: 'Enter first number',
          placeholder: '0',
          inputType: 'number',
          action: 'set_num1'
        },
        {
          type: 'input',
          label: 'Enter second number',
          placeholder: '0',
          inputType: 'number',
          action: 'set_num2'
        },
        {
          type: 'button',
          label: 'Add',
          action: 'calculate_add',
          variant: 'primary'
        },
        {
          type: 'button',
          label: 'Multiply',
          action: 'calculate_multiply',
          variant: 'secondary'
        }
      ],
      context: { ...context, calculator: {} }
    };
  }

  // Multi-step flow
  if (userMessage.includes('booking') || userMessage.includes('appointment') || userMessage.includes('schedule')) {
    return {
      content: "Let's book an appointment. First, select your preferred date:",
      components: [
        {
          type: 'select',
          label: 'Choose a date',
          options: [
            { value: '2024-10-27', label: 'Monday, Oct 27' },
            { value: '2024-10-28', label: 'Tuesday, Oct 28' },
            { value: '2024-10-29', label: 'Wednesday, Oct 29' },
            { value: '2024-10-30', label: 'Thursday, Oct 30' },
            { value: '2024-10-31', label: 'Friday, Oct 31' },
          ],
          action: 'select_date'
        }
      ],
      context: { ...context, bookingFlow: { step: 1 } }
    };
  }

  // Default response with examples
  return {
    content: "I can help you with various interactive UI elements! Here are some quick actions:",
    components: [
      {
        type: 'button',
        label: '📋 Show Data Table',
        action: 'show_table',
        variant: 'primary'
      },
      {
        type: 'button',
        label: '📊 Generate Chart',
        action: 'show_chart',
        variant: 'secondary'
      },
      {
        type: 'button',
        label: '📝 Create Form',
        action: 'show_form',
        variant: 'secondary'
      }
    ],
    context
  };
}

function handleAction(action: string, data: any, context: Record<string, any>): {
  content: string;
  components?: UIComponent[];
  context: Record<string, any>;
} {
  // Handle form submission
  if (action === 'submit_signup') {
    return {
      content: `Thanks for signing up, ${data.name}! We've sent a confirmation email to ${data.email}. 🎉`,
      components: [
        {
          type: 'card',
          title: 'Registration Successful',
          content: `Welcome aboard! Your account has been created and you can now access all features.`,
          actions: [
            { label: 'Go to Dashboard', action: 'goto_dashboard' }
          ]
        }
      ],
      context: { ...context, user: data }
    };
  }

  // Handle button actions
  if (action === 'show_table') {
    return {
      content: "Here's your requested data table:",
      components: [
        {
          type: 'table',
          caption: 'User Activity Report',
          headers: ['User', 'Actions', 'Last Active', 'Status'],
          rows: [
            ['Alice Johnson', '45', '2 mins ago', '🟢 Online'],
            ['Bob Smith', '32', '1 hour ago', '🟡 Away'],
            ['Carol White', '78', '5 mins ago', '🟢 Online'],
            ['David Brown', '23', '3 hours ago', '🔴 Offline'],
          ]
        }
      ],
      context
    };
  }

  if (action === 'show_chart') {
    return {
      content: "Here's a visualization of your data:",
      components: [
        {
          type: 'chart',
          chartType: 'bar',
          title: 'Weekly Activity',
          data: [
            { name: 'Mon', value: 12 },
            { name: 'Tue', value: 19 },
            { name: 'Wed', value: 15 },
            { name: 'Thu', value: 25 },
            { name: 'Fri', value: 22 },
            { name: 'Sat', value: 8 },
            { name: 'Sun', value: 5 },
          ]
        }
      ],
      context
    };
  }

  if (action === 'show_form') {
    return {
      content: "Here's a contact form:",
      components: [
        {
          type: 'form',
          fields: [
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
            { label: 'Message', name: 'message', type: 'text', placeholder: 'Your message...' },
          ],
          submitLabel: 'Send Message',
          action: 'submit_contact',
        }
      ],
      context
    };
  }

  // Handle calculator actions
  if (action === 'set_num1') {
    return {
      content: `First number set to ${data.value}. Now enter the second number.`,
      context: { ...context, calculator: { ...context.calculator, num1: parseFloat(data.value) } }
    };
  }

  if (action === 'set_num2') {
    return {
      content: `Second number set to ${data.value}. Click a button to calculate.`,
      context: { ...context, calculator: { ...context.calculator, num2: parseFloat(data.value) } }
    };
  }

  if (action === 'calculate_add') {
    const num1 = context.calculator?.num1 || 0;
    const num2 = context.calculator?.num2 || 0;
    const result = num1 + num2;
    return {
      content: `Result: ${num1} + ${num2} = ${result}`,
      components: [
        {
          type: 'card',
          title: 'Calculation Result',
          content: `The sum is ${result}`,
          actions: [{ label: 'Calculate Again', action: 'show_form' }]
        }
      ],
      context
    };
  }

  if (action === 'calculate_multiply') {
    const num1 = context.calculator?.num1 || 0;
    const num2 = context.calculator?.num2 || 0;
    const result = num1 * num2;
    return {
      content: `Result: ${num1} × ${num2} = ${result}`,
      components: [
        {
          type: 'card',
          title: 'Calculation Result',
          content: `The product is ${result}`,
          actions: [{ label: 'Calculate Again', action: 'show_form' }]
        }
      ],
      context
    };
  }

  // Handle booking flow
  if (action === 'select_date') {
    return {
      content: `Great! You selected ${data.value}. Now choose a time slot:`,
      components: [
        {
          type: 'select',
          label: 'Choose a time',
          options: [
            { value: '09:00', label: '9:00 AM' },
            { value: '10:00', label: '10:00 AM' },
            { value: '11:00', label: '11:00 AM' },
            { value: '14:00', label: '2:00 PM' },
            { value: '15:00', label: '3:00 PM' },
            { value: '16:00', label: '4:00 PM' },
          ],
          action: 'select_time'
        }
      ],
      context: { ...context, bookingFlow: { ...context.bookingFlow, date: data.value, step: 2 } }
    };
  }

  if (action === 'select_time') {
    const date = context.bookingFlow?.date;
    return {
      content: `Perfect! Your appointment is booked for ${date} at ${data.value}. 📅`,
      components: [
        {
          type: 'card',
          title: 'Booking Confirmed',
          content: `Date: ${date}\nTime: ${data.value}\n\nWe'll send you a reminder 24 hours before your appointment.`,
          actions: [
            { label: 'Add to Calendar', action: 'add_calendar' },
            { label: 'Book Another', action: 'book_another' }
          ]
        }
      ],
      context: { ...context, bookingFlow: { ...context.bookingFlow, time: data.value, confirmed: true } }
    };
  }

  // Handle rating
  if (action === 'submit_rating') {
    const stars = '⭐'.repeat(parseInt(data.value));
    return {
      content: `Thank you for rating us ${stars}! Your feedback helps us improve.`,
      context
    };
  }

  if (action === 'submit_comment') {
    return {
      content: `Thanks for your comment: "${data.value}". We appreciate your detailed feedback!`,
      context
    };
  }

  // Product actions
  if (action === 'learn_more_premium' || action === 'learn_more_basic') {
    const plan = action.includes('premium') ? 'Premium' : 'Basic';
    return {
      content: `Here are more details about the ${plan} plan:`,
      components: [
        {
          type: 'list',
          items: [
            plan === 'Premium' ? 'Unlimited storage' : '10GB storage',
            plan === 'Premium' ? 'Priority 24/7 support' : 'Email support',
            'Advanced analytics',
            plan === 'Premium' ? 'Custom integrations' : 'Basic integrations',
            plan === 'Premium' ? '$29.99/month' : '$9.99/month'
          ]
        },
        {
          type: 'button',
          label: `Buy ${plan} Plan`,
          action: `buy_${plan.toLowerCase()}`,
          variant: 'primary'
        }
      ],
      context
    };
  }

  if (action.startsWith('buy_')) {
    const plan = action.replace('buy_', '');
    return {
      content: `Redirecting to checkout for the ${plan} plan...`,
      components: [
        {
          type: 'card',
          title: 'Purchase Initiated',
          content: 'Please complete the payment process to activate your subscription.',
        }
      ],
      context
    };
  }

  // Default action response
  return {
    content: `Action "${action}" received! ${data ? `Data: ${JSON.stringify(data)}` : ''}`,
    context
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, context = {}, action, actionData } = body;

    const response = generateResponse(messages, context, action, actionData);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { content: 'An error occurred processing your request.', components: [] },
      { status: 500 }
    );
  }
}
