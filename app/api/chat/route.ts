import { NextRequest } from "next/server";
import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { createDeepSeek } from "@ai-sdk/deepseek";

const deepSeek = createDeepSeek({
    apiKey: 'sk-39369143328e4cc29fa0909e05b4df75', // 设置 API 密钥
});

export async function POST(req: NextRequest) {
    try {
        console.log('--- Incoming Chat Request ---');
        
        // 1. 获取并解析请求体
        let body;
        try {
            body = await req.json();
            console.log(body,'body');
            
        } catch (e) {
            console.error('Failed to parse request JSON:', e);
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { messages } = body as { messages: UIMessage[] };
        
        // 2. 校验 messages
        if (!messages || !Array.isArray(messages)) {
            console.error('Validation Failed: messages is missing or not an array. Body:', JSON.stringify(body));
            return new Response(JSON.stringify({ 
                error: 'Invalid messages format. "messages" array is required.',
                received: messages === undefined ? 'undefined' : typeof messages
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log(`Processing ${messages.length} messages...`);

        // 3. 转换消息格式
        let modelMessages;
        try {
            modelMessages = await convertToModelMessages(messages);
        } catch (e) {
            console.error('Error in convertToModelMessages:', e);
            throw e; // 重新抛出以进入外部 catch
        }
        console.log(modelMessages,'modelMessages');
        
        // 4. 生成流式响应
        const result = streamText({
            model: deepSeek('deepseek-chat'),
            messages: modelMessages,
            system: '你是一个高级程序员，请根据用户的问题给出回答',
        });

        console.log('Stream started successfully');

        // 5. 返回流式响应，使用 toUIMessageStreamResponse 以适配 useChat 的 UIMessage 格式协议
        // 使用 as any 避开 TS 类型检查，因为运行时已知存在此方法
        return (result as any).toUIMessageStreamResponse();
    } catch (error) {
        console.error('Chat API Fatal Error:', error);
        return new Response(JSON.stringify({ 
            error: 'Internal Server Error', 
            details: error instanceof Error ? error.message : String(error) 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
