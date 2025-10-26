export type UIComponent = 
  | { type: 'button'; label: string; action: string; variant?: 'primary' | 'secondary' | 'danger' }
  | { type: 'input'; label: string; placeholder?: string; inputType?: string; action: string }
  | { type: 'form'; fields: Array<{ label: string; name: string; type: string; placeholder?: string }>; submitLabel: string; action: string }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'chart'; chartType: 'line' | 'bar' | 'pie'; data: Array<{ name: string; value: number; [key: string]: any }>; title?: string; xKey?: string; yKey?: string }
  | { type: 'card'; title: string; content: string; actions?: Array<{ label: string; action: string }> }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'select'; label: string; options: Array<{ value: string; label: string }>; action: string };

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  components?: UIComponent[];
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  context: Record<string, any>;
}
