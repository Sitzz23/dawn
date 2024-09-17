export const languages = [
  {
    value: "c",
    label: "C",
    boilerplate:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  },
  {
    value: "cpp",
    label: "C++",
    boilerplate:
      '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  },
  {
    value: "java",
    label: "Java",
    boilerplate:
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  },
  { value: "python", label: "Python", boilerplate: 'print("Hello, World!")' },
  {
    value: "javascript",
    label: "JavaScript",
    boilerplate: 'console.log("Hello, World!");',
  },
];

export const languageToJudge0Id = {
  c: 50,
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 63,
};
