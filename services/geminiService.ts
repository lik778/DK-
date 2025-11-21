import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const summarizeDocument = async (fileName: string, content: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "AI 服务不可用：缺少 API Key。";

  try {
    const model = 'gemini-2.5-flash';
    // Updated prompt for Chinese output
    const prompt = `你是一个企业文档助手。请为名为 "${fileName}" 的文档生成一个简练的中文行政摘要（最多3个要点）。\n\n文档内容:\n${content}`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "无法生成摘要。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "生成摘要时出错，请检查网络或 API 配额。";
  }
};

export const smartSearch = async (query: string, allFilesContext: string): Promise<string[]> => {
  const ai = getClient();
  if (!ai) return [];

  try {
    // Updated prompt for Chinese context understanding
    const model = 'gemini-2.5-flash';
    const prompt = `
      你是一个智能文件系统搜索引擎。
      用户查询: "${query}"
      
      以下是可用文件列表 (ID: 名称 - 内容片段):
      ${allFilesContext}
      
      请返回一个 JSON 字符串数组，其中仅包含与用户查询语义相关的文件 ID。
      如果没有匹配的文件，请返回空数组 []。
      不要包含 markdown 格式（如 \`\`\`json），只返回原始 JSON 字符串。
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    const text = response.text;
    if (!text) return [];
    
    try {
      const ids = JSON.parse(text);
      return Array.isArray(ids) ? ids : [];
    } catch (e) {
      console.error("Failed to parse JSON from AI", text);
      return [];
    }
  } catch (error) {
    console.error("Smart Search Error:", error);
    return [];
  }
};

export const autoTagDocument = async (fileName: string, content: string): Promise<string[]> => {
  const ai = getClient();
  if (!ai) return ["手动标签"];

  try {
    const model = 'gemini-2.5-flash';
    // Updated prompt for Chinese tags
    const prompt = `请为名为 "${fileName}" 的企业文档（内容片段："${content.substring(0, 500)}..."）生成 3 个简短、专业的中文元数据标签。只返回一个 JSON 字符串数组，例如：["财务", "第三季度", "报告"]。`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
       config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return [];

    return JSON.parse(text);
  } catch (error) {
    console.error("Auto-tagging Error:", error);
    return ["处理错误"];
  }
};