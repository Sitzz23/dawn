import { query } from "./_generated/server";
import { v } from "convex/values";

export const getRandomQuestions = query({
  args: {
    roomDuration: v.number(),
  },
  handler: async (ctx, args) => {
    const { roomDuration } = args;

    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;

    switch (roomDuration) {
      case 15:
        easyCount = 3;
        break;
      case 30:
        easyCount = 2;
        mediumCount = 2;
        break;
      case 45:
        easyCount = 3;
        mediumCount = 2;
        hardCount = 1;
        break;
      case 60:
        easyCount = 3;
        mediumCount = 3;
        hardCount = 2;
        break;
    }

    const getRandomQuestionsForDifficulty = async (
      difficulty: string,
      count: number
    ) => {
      const questions = await ctx.db
        .query("questions")
        .filter((q) => q.eq(q.field("difficulty"), difficulty))
        .order("asc")
        .collect();

      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }

      return questions.slice(0, count);
    };

    const easyQuestions = await getRandomQuestionsForDifficulty(
      "easy",
      easyCount
    );
    const mediumQuestions = await getRandomQuestionsForDifficulty(
      "medium",
      mediumCount
    );
    const hardQuestions = await getRandomQuestionsForDifficulty(
      "hard",
      hardCount
    );

    const allQuestions = [
      ...easyQuestions,
      ...mediumQuestions,
      ...hardQuestions,
    ];

    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }

    return allQuestions;
  },
});

export const fetchQuestionsByIds = query({
  args: { questionIds: v.optional(v.array(v.id("questions"))) },
  handler: async (ctx, args) => {
    const { questionIds } = args;

    if (!questionIds) {
      throw new Error("No questions generated!");
    }

    const questionsPromises = questionIds.map((id) => ctx.db.get(id));
    const questions = await Promise.all(questionsPromises);

    const validQuestions = questions.filter((q) => q !== null);

    return validQuestions;
  },
});
