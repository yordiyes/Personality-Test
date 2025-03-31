const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// MBTI Descriptions
const MBTI_Descriptions = {
  ISTJ: [
    "People with an ISTJ personality are known for their practicality, reliability, and integrity. They are often seen as the backbone of many organizations, providing a steady and dependable presence. This personality type values tradition and order, placing a strong emphasis on following rules and procedures.",
    "ISTJs are highly organized and structured. They prefer to plan their activities well in advance and are not comfortable with improvisation or unpredictability. This makes them excellent in roles that require attention to detail and a methodical approach. They have a strong sense of duty and take their responsibilities very seriously. Their deep sense of loyalty extends to their families, communities, and workplaces.",
    "In terms of interpersonal relationships, ISTJs tend to be reserved and prefer a small circle of close friends rather than a wide network of acquaintances. They are not naturally attuned to expressing their emotions and may find it challenging to understand the emotional needs of others. However, once they form a bond, they are incredibly loyal and dependable friends and partners. They show their care through actions rather than words, often going to great lengths to fulfill their commitments to loved ones.",
    "ISTJs excel in careers that require precision and organization. They are naturally drawn to roles in administration, management, law enforcement, and accounting. Their ability to focus and work independently, combined with their respect for rules and standards, makes them highly effective in these fields. They are not typically drawn to careers that require high levels of emotional interaction or abstract thinking. Instead, they prefer concrete tasks where they can apply their practical skills and see tangible results.",
    "Despite their many strengths, ISTJs can sometimes struggle with change and adaptability. They may be reluctant to deviate from their tried-and-true methods and can be skeptical of new ideas. This can sometimes limit their ability to grow in rapidly changing environments. However, their dependability, thoroughness, and commitment to their values make ISTJs invaluable in many aspects of life and work. Their grounded approach helps bring stability and realism to their endeavors.",
  ],
  ISFJ: [
    "People with the ISFJ personality type are characterized by a deep sense of altruism and a strong sense of duty. They are typically reliable and considerate, with a keen attention to detail and a strong sense of responsibility. They tend to be quiet and reserved, preferring to work behind the scenes rather than being in the spotlight. ISFJs are driven by their values and beliefs, often showing a remarkable level of caring and compassion towards others. They are generally very supportive and patient, always ready to help those in need.",
    "One of the most notable traits of ISFJs is their commitment to tradition and stability. They often uphold and respect established systems and structures, believing in the importance of order and consistency. This makes them excellent at organizing and executing tasks, especially those that involve meticulous attention to detail. Their respect for tradition and stability also means that they often have a strong connection to their family and cultural heritage. ISFJs value harmony and seek to create a peaceful and structured environment both at home and in the workplace.",
    "ISFJs are extremely perceptive of other people's feelings and needs. They have a natural ability to understand and empathize with others, often intuiting what others are feeling even without explicit communication. This sensitivity makes them excellent listeners and advisors. However, their strong focus on others' needs can sometimes lead to them neglecting their own needs or desires. They tend to be self-sacrificing, often putting the needs of others before their own, which can sometimes lead to burnout or resentment if not managed carefully.",
    "In relationships, ISFJs are loyal, devoted, and protective. They take their commitments very seriously and seek long-term, stable relationships. They often show their love and care through practical means, like doing tasks and errands for loved ones or providing emotional support during difficult times. ISFJs have a strong desire to maintain harmony and avoid conflict, which can sometimes lead them to suppress their own feelings or avoid confronting issues directly. Nevertheless, they are incredibly supportive and caring partners, always willing to go the extra mile for the people they care about.",
    "In the workplace, ISFJs are reliable and hardworking, often excelling in roles that involve helping or caring for others. They are well-suited to careers in healthcare, education, and social work, where their empathy and attention to detail can be put to good use. ISFJs are team players who value a collaborative and supportive work environment. They are not typically drawn to leadership roles, but when they do take on such positions, they lead with a focus on supporting and nurturing the growth and well-being of their team members. Their dedication, reliability, and strong work ethic make them invaluable assets to any team.",
  ],
  INFJ: [
    "INFJs are often described as insightful, compassionate, and deeply connected to their ideals. They are driven by a desire to help others and make the world a better place. With a unique ability to understand the feelings and motivations of others, INFJs are empathetic listeners who offer support and guidance to those in need. They value authenticity and are committed to living in alignment with their personal values.",
    "INFJs tend to be introspective and may prefer a small circle of close friends over large social gatherings. They often find themselves drawn to careers that allow them to contribute to meaningful causes, such as counseling, teaching, or social work. Although INFJs are often reserved, they can be highly passionate when discussing their beliefs and can inspire others with their vision for a better future.",
    "They are often creative, imaginative, and intuitive, with a strong sense of purpose that guides their actions. While they are deeply caring and loyal to their loved ones, they can sometimes struggle with setting boundaries, leading to emotional burnout if they overextend themselves. INFJs seek deep, fulfilling relationships and may feel misunderstood by those who do not share their values or worldviews.",
    "In relationships, they are dedicated and supportive partners, striving to create a harmonious and emotionally nurturing environment. Their idealism and desire for growth can sometimes lead them to expect perfection from themselves and others, which can be challenging if their expectations are not met. Despite this, INFJs possess a deep inner strength that enables them to overcome obstacles and remain committed to their goals.",
    "While INFJs are passionate about their causes, they can sometimes become disheartened if they feel their efforts are not making a meaningful impact. However, their ability to see the bigger picture and inspire change makes them invaluable in many social and professional settings. They thrive in environments where they can combine their compassion, creativity, and strategic thinking to bring about positive transformation.",
  ],
  INTJ: [
    "People with the INTJ personality type are known for their high level of self-confidence, analytical skills, and strategic thinking. They are deeply independent, preferring to rely on their own intellect and logic rather than follow popular opinion or tradition. INTJs are characterized by their clear vision of the future and a relentless drive to achieve their goals, often displaying a remarkable ability to turn theories into solid plans of action.",
    "INTJs are inherently curious and enjoy delving into complex problems, making them excellent problem-solvers. Their minds are constantly working to generate new ideas and theories, which they approach with skepticism and rationality. They are particularly adept at identifying inefficiencies and developing innovative solutions to systemic issues. This ability makes them excellent in roles that require strategic planning and an analytical approach. Despite their introverted nature, they can be fiercely independent and decisive, trusting their intuition and knowledge to guide them.",
    "Socially, INTJs can be challenging to get to know. They are often reserved and prefer solitude or the company of a few close friends to large social gatherings. They value deep, intellectual conversations over small talk and are not typically swayed by emotions or personal appeals. This can sometimes make them seem detached or aloof, but to those they let in, INTJs are fiercely loyal, often going to great lengths to help a friend or loved one.",
    "In the workplace, INTJs are driven, original thinkers who prefer to work independently or in small groups. They are often drawn to careers that involve complex intellectual challenges and offer the freedom to develop creative solutions. Typical career paths for INTJs include engineering, science, mathematics, and technical fields, where their skills in analysis and strategy are highly valued. They have high standards for performance, both for themselves and for others, which can sometimes lead to frustration in team settings.",
    "Overall, INTJs are distinguished by their strategic, logical way of thinking, their clear vision of the future, and their ability to understand complex systems and concepts. While they may appear reserved or even aloof, they are deeply committed to their ideals and objectives. Their ability to think critically and see the bigger picture makes them invaluable in roles that require innovation and long-term planning.",
  ],
  ISTP: [
    "ISTPs are practical, adaptable, and logical problem-solvers. They enjoy exploring how things work and tend to focus on the present moment. Often referred to as ‘mechanics,’ ISTPs are hands-on learners who thrive in environments where they can experiment and find practical solutions to real-world problems. They are independent and value their autonomy, often preferring to work alone or in small, efficient teams.",
    "ISTPs tend to be quiet and reserved, but they have a sharp, analytical mind and are quick to respond to changing situations. They are often drawn to activities that involve physical skill, such as sports, building, or technical work, where they can apply their practical knowledge and hands-on approach.",
    "ISTPs are often seen as action-oriented and enjoy tackling challenges head-on. They can be calm and composed in stressful situations, relying on their instincts and problem-solving abilities to find solutions.",
    "In relationships, ISTPs tend to be independent and may value personal space and freedom. They may find it difficult to express their emotions, but they are reliable and trustworthy when it comes to practical matters.",
    "ISTPs excel in careers that allow them to use their technical skills and engage in problem-solving, such as engineering, mechanics, and computer programming. Their adaptability and hands-on approach make them well-suited to fields that require quick thinking and efficient execution.",
  ],
  ISFP: [
    "ISFPs are gentle, creative, and spontaneous individuals who value their independence and personal freedom. They are often described as artistic and have a strong appreciation for beauty, whether it's in nature, art, or the world around them. ISFPs are highly attuned to their sensory experiences, which leads them to enjoy activities that allow them to express their creativity, such as painting, music, or writing.",
    "They are deeply connected to their feelings and are guided by their internal values, often seeking to live in harmony with themselves and others. ISFPs tend to be quiet and reserved, preferring to observe the world around them rather than seek out the spotlight. They value personal space and may find it challenging to engage in large social gatherings or discussions.",
    "Despite their quiet nature, ISFPs are compassionate and caring, often going out of their way to help others, especially those they are close to.",
    "In relationships, ISFPs are warm, affectionate, and loyal partners who prioritize harmony and emotional connection. They can be sensitive to criticism and may have a tendency to withdraw if they feel misunderstood or hurt.",
    "ISFPs often excel in creative fields where they can express their artistic talents, such as design, photography, or music. They are also drawn to roles that involve helping others, such as counseling or social work, where their empathy and understanding can make a difference.",
  ],
  INFP: [
    "People with the INFP personality are often characterized by a deep sense of idealism and integrity. Individuals with this personality are known for their curiosity, imagination, and their aspiration to understand the world around them on a deeper level. They are driven by a strong set of personal values and beliefs, often striving to make the world a better place.",
    "INFPs are typically open-minded and creative, always looking for the hidden meanings and possibilities in their surroundings. Their internal world is rich and complex, often filled with a myriad of ideas and fantasies. They are more focused on the bigger picture rather than the minute details, and they cherish personal growth and self-discovery.",
    "Socially, INFPs are often quiet and reserved, preferring to interact with a small group of close friends rather than large social gatherings. They are compassionate, empathetic, and often go out of their way to help others. Despite their quiet demeanor, they are deeply passionate about their beliefs and can become very vocal and persuasive when discussing matters close to their heart.",
    "In their professional lives, INFPs seek jobs that align with their values and allow them to express their creativity. They thrive in environments where they can work independently and at their own pace. They often find fulfillment in careers that involve helping others, artistic expression, or exploring abstract concepts. INFPs prefer to avoid routine, mundane tasks and instead seek roles that allow them to use their imagination and make a meaningful impact.",
    "INFPs face certain challenges due to their personality traits. Their idealism can sometimes lead to disappointment when reality falls short of their high expectations. They can be prone to emotional sensitivity, taking criticism personally and feeling misunderstood. Decision making can be difficult for INFPs, especially when they are required to focus on hard facts and logic, as they prefer to rely on their intuition and feelings. Despite these challenges, INFPs possess a number of strengths that make them unique and valuable in various aspects of life.",
  ],
  INTP: [
    "People with the INTP personality are known for their intellectual curiosity, analytical minds, and desire to understand the world around them. They are often referred to as the 'thinkers' or 'logicians' of the personality types. INTPs are driven by a need to explore ideas and concepts, often delving deep into topics that pique their interest. They enjoy dissecting complex problems and finding innovative solutions, relying on logic and reason rather than emotions or external pressures.",
    "INTPs are typically independent and enjoy spending time alone, using this time to reflect on their thoughts and theories. They are not overly concerned with social norms or traditions and often question the status quo, seeking to challenge and improve existing systems and ideas.",
    "In social situations, INTPs tend to be reserved and may come across as aloof or distant. They do not feel the need to constantly engage in small talk or adhere to societal expectations, and they may prefer to engage in deeper, more meaningful conversations. While they can form strong, intellectual bonds with others, they often struggle with emotional expression and may not always recognize or address the emotional needs of those around them.",
    "In the workplace, INTPs excel in environments that allow them to think critically and work independently. They are naturally drawn to careers in fields such as science, technology, philosophy, and academia, where they can explore abstract concepts and engage in problem-solving. INTPs are not typically drawn to managerial or leadership roles, as they prefer to focus on intellectual exploration and innovation rather than on organizational tasks or people management.",
    "Despite their intellectual strengths, INTPs can sometimes struggle with completing projects or following through on commitments, as they are often more interested in exploring new ideas than in finishing existing ones. They can also be prone to overthinking, which may lead to indecisiveness or difficulty in making practical decisions. However, their ability to think critically, solve complex problems, and engage in deep intellectual pursuits makes them highly valuable in fields that require innovative thinking and analysis.",
    "INTPs tend to have a small circle of close friends who share their intellectual interests, and they value independence and freedom in their relationships. They are not typically drawn to relationships based on societal expectations or conventions, preferring to form connections based on shared ideas and values. Overall, INTPs are unique individuals who bring creativity, intellectual depth, and critical thinking to everything they do.",
  ],
  ESTP: [
    "ESTPs are energetic, action-oriented individuals who thrive in fast-paced environments. They are practical and grounded, preferring to deal with the present moment rather than dwell on the past or future. Often described as ‘doers,’ ESTPs are spontaneous and enjoy engaging in activities that provide immediate results or gratification. They are quick thinkers who excel at making decisions on the fly and adapting to changing circumstances.",
    "ESTPs are social and enjoy being around others, often bringing excitement and energy to group situations. They are persuasive communicators and can charm others with their confidence and charisma.",
    "ESTPs are often drawn to careers that involve action, risk-taking, and problem-solving, such as sales, emergency response, and sports. They have a natural ability to think on their feet and respond to challenges with creativity and practical solutions.",
    "In relationships, ESTPs are fun-loving and adventurous partners who enjoy living in the moment. They value their independence but are also loyal and supportive when it comes to their loved ones.",
    "ESTPs may sometimes struggle with long-term planning or attention to detail, as they are more focused on the here and now. However, their dynamic nature and ability to adapt to new situations make them a valuable asset in many settings.",
  ],
  ESFP: [
    "ESFPs are outgoing, spontaneous, and playful individuals who thrive on excitement and social interaction. They are the life of the party, often attracting others with their fun-loving nature and infectious energy. ESFPs enjoy being in the moment and are known for their ability to make any situation enjoyable.",
    "They are highly attuned to their surroundings and enjoy engaging with the sensory experiences of the world, whether through music, food, or adventure. ESFPs are typically warm-hearted and enjoy helping others, making them natural caregivers and friends.",
    "They value personal freedom and often seek out new experiences, preferring to live a life filled with variety and excitement.",
    "In relationships, ESFPs are affectionate and caring, often showing their love through actions and shared experiences. They may struggle with commitment if they feel restricted or bored, but they are loyal partners when they find someone who shares their enthusiasm for life.",
    "ESFPs excel in careers that involve social interaction, creativity, and hands-on work. They are often drawn to roles in entertainment, healthcare, or sales, where they can interact with others and bring a sense of fun to their work.",
  ],
  ENFP: [
    "ENFPs are creative, energetic, and highly driven by their values and passions. They thrive on new ideas and possibilities, often finding inspiration in unexpected places. Known for their enthusiasm and warmth, ENFPs love to connect with others on a deep, emotional level. They are imaginative and open-minded, constantly exploring new ideas and opportunities.",
    "ENFPs are often described as 'free spirits' because they value their independence and are driven by a need to follow their hearts rather than adhering to rigid systems or structures. They are highly curious and can easily shift from one interest to another, always seeking personal growth and self-expression.",
    "Socially, ENFPs are outgoing and enjoy interacting with a wide range of people. They are natural conversationalists, easily sparking engaging and meaningful conversations. They value deep, authentic connections and are drawn to people who share their ideals and passions. ENFPs are highly empathetic and often have a knack for understanding and connecting with others on an emotional level. They are excellent listeners and are often seen as compassionate and supportive friends.",
    "In relationships, ENFPs are enthusiastic, affectionate, and open to exploring new experiences with their partners. They are spontaneous and love surprises, often looking for excitement and adventure in their personal lives. However, ENFPs can sometimes struggle with routine and may find it difficult to stay committed to one person or one path for long periods of time. They are also prone to overthinking and may occasionally become overwhelmed by their emotions or the many possibilities that life presents.",
    "In the workplace, ENFPs excel in creative, people-oriented environments. They are naturally drawn to roles that allow them to innovate, inspire others, and work towards a greater purpose. Careers in counseling, teaching, writing, or the arts are often a good fit for ENFPs, as these fields allow them to express their creativity and passion while helping others. ENFPs tend to shy away from roles that involve repetitive tasks or rigid structures, as they thrive in environments that allow for flexibility and growth.",
    "Despite their many strengths, ENFPs can sometimes become easily distracted or lose focus, especially if they are not fully engaged in their work. They may also struggle with completing tasks or projects, as they are often more interested in starting new things than in following through with them. Nonetheless, their creativity, enthusiasm, and ability to connect with others make ENFPs highly valuable in any setting that requires innovation and emotional intelligence.",
  ],
  ENTP: [
    "ENTPs are innovative, enthusiastic, and enjoy intellectual challenges. They love exploring new ideas and possibilities, often challenging existing conventions and questioning the status quo. ENTPs are highly independent thinkers who enjoy engaging in debate and stimulating conversation. They are often seen as curious, quick-witted, and resourceful, always looking for new ways to approach problems and challenges.",
    "ENTPs thrive in environments that allow them to be creative and flexible. They are not afraid to take risks and are often the first to try out new ideas or strategies. Their love for intellectual exploration means they are often drawn to careers that involve problem-solving, innovation, and strategy. ENTPs are typically drawn to fields such as entrepreneurship, technology, consulting, and law, where their ability to think on their feet and challenge the norm can be put to good use.",
    "ENTPs are highly social and enjoy engaging with others, but they are also independent and value their freedom. They tend to have a wide circle of friends and acquaintances but may prefer to engage in deep, meaningful conversations with a select few. ENTPs are often seen as energetic and charismatic, able to inspire others with their ideas and enthusiasm.",
    "However, they can sometimes be perceived as argumentative or overly critical, as they enjoy challenging others' viewpoints and playing devil's advocate. This can sometimes cause friction in relationships or in team settings.",
    "ENTPs are excellent at seeing the big picture and coming up with creative solutions to complex problems. They are highly adaptable and thrive in environments that allow them to explore new ideas and test out new approaches. However, they can sometimes struggle with follow-through, as they are more interested in generating new ideas than in executing them. They may also struggle with routine or repetitive tasks, as they prefer novelty and variety.",
    "Despite these challenges, ENTPs are highly valued for their creativity, problem-solving abilities, and their ability to inspire and motivate others.",
  ],
  ESTJ: [
    "People with the ESTJ personality type are known for their strong sense of duty, practicality, and leadership abilities. They are decisive, goal-oriented individuals who enjoy taking charge of situations and organizing people and resources to achieve a desired outcome. ESTJs are highly structured and organized, preferring to follow established rules and procedures. They thrive in environments that provide clear expectations and well-defined roles.",
    "They tend to be pragmatic and realistic, focusing on facts and evidence rather than abstract theories or possibilities. ESTJs value efficiency and productivity and are often excellent at managing tasks, people, and projects. They are natural leaders who take their responsibilities seriously and are often entrusted with positions of authority. ESTJs have a strong sense of tradition and are typically drawn to roles that allow them to maintain order and stability.",
    "In social settings, ESTJs are straightforward and assertive, often taking the lead in conversations and decision-making. They value honesty and directness and are not afraid to express their opinions or challenge others if they feel it is necessary. ESTJs are typically highly loyal and dependable, but they can sometimes be seen as rigid or overly critical, especially when they feel that rules or traditions are being ignored.",
    "In relationships, ESTJs are dedicated, reliable, and protective of their loved ones. They are often seen as the pillars of their families and communities, always willing to step up and take responsibility when needed. However, their strong focus on duty and tradition can sometimes make them seem distant or overly focused on work, potentially neglecting the emotional needs of their partners or family members.",
    "In the workplace, ESTJs excel in managerial and leadership roles, where they can use their organizational skills and sense of responsibility to drive productivity and success. They are often drawn to careers in business, law enforcement, and the military, where their ability to make quick decisions and enforce rules is highly valued.",
    "ESTJs can sometimes struggle with flexibility and adaptability, as they prefer established systems and may find it difficult to embrace change. However, their dependability, work ethic, and commitment to efficiency make them invaluable assets in many work and social settings.",
  ],
  ESFJ: [
    "ESFJs are caring, social, and organized individuals who are deeply committed to helping others and maintaining harmony in their relationships. They are often seen as the ‘nurturers’ of the personality types, as they are highly attuned to the emotional needs of those around them. ESFJs are warm and empathetic, always willing to lend a helping hand and provide support to their loved ones. They value tradition, stability, and social harmony, and they often play a central role in their communities and families.",
    "ESFJs are highly organized and enjoy creating structure and order in their lives. They are detail-oriented and take pride in fulfilling their responsibilities, often going above and beyond to ensure that everything runs smoothly.",
    "In relationships, ESFJs are devoted and loyal partners who seek to create a supportive and loving environment for their loved ones. They may struggle with conflict or criticism, as they value harmony and may feel hurt if their efforts are not recognized. However, their dedication to others makes them dependable and loving friends and partners.",
    "ESFJs excel in careers that involve caregiving, education, and customer service. They thrive in environments where they can make a positive impact on others and create a sense of community.",
  ],
  ENFJ: [
    "ENFJs are empathetic, charismatic, and natural leaders who are driven by a desire to help others reach their full potential. They are deeply concerned with the well-being of others and are often seen as nurturing, supportive, and encouraging. ENFJs excel at understanding the emotions and needs of others, often sensing what others need before they express it. They are highly intuitive and compassionate, able to connect with people on a deep, emotional level.",
    "ENFJs are typically outgoing and social, enjoying interactions with a wide variety of people. They are often found in leadership roles or in careers that involve helping or guiding others, such as teaching, counseling, or coaching.",
    "In relationships, ENFJs are warm, affectionate, and committed. They prioritize the needs of others and are dedicated to fostering harmony and understanding in their relationships. They are often seen as the 'glue' that holds their families, communities, or teams together. However, their strong focus on others can sometimes lead them to neglect their own needs or emotions.",
    "ENFJs are idealistic and believe in the potential for growth and improvement in others. This makes them excellent mentors, but they may become frustrated when others do not meet their high expectations. Despite this, ENFJs are incredibly supportive and are driven by a strong desire to make a positive impact on the lives of others. They excel in environments where they can inspire, guide, and support others in their personal and professional growth.",
  ],
  ENTJ: [
    "People with the ENTJ personality type are characterized by a natural leadership quality that combines charisma, confidence, and strategic thinking. People with this personality type are assertive and outspoken, thriving on the challenge of leading groups and projects. They are often found at the forefront of initiatives, confidently directing others towards a set goal.",
    "ENTJs have a unique ability to identify long-term goals and construct detailed plans to achieve them. This often makes them successful in business and managerial roles, where their clear vision and decisiveness are highly valued. ENTJs are known for their rational and logical approach to problems. They prefer to analyze situations with a critical eye, using their strong intuitive sense to foresee potential outcomes and pitfalls. This analytical prowess enables them to devise efficient, innovative solutions.",
    "They are less swayed by emotion and more by facts and evidence, which makes them excellent in roles that require objective decision-making. However, this can sometimes lead to a perceived lack of empathy or sensitivity, as they prioritize efficiency and results over emotional considerations.",
    "Communication is a strong suit for ENTJs, who are articulate and eloquent. They are skilled at expressing their ideas and persuasions clearly and persuasively, making them effective communicators in both personal and professional contexts. Their directness in communication is often appreciated in a business environment, but it can occasionally come across as blunt or even confrontational in more personal settings.",
    "ENTJs have a natural inclination to lead discussions and debates, often enjoying the intellectual challenge that comes with it. In interpersonal relationships, ENTJs are often seen as challenging and stimulating companions. They enjoy intellectual discussions and debates and are drawn to people who can match their level of intensity and energy.",
    "Although they may not be the most emotionally expressive, they show their care through actions and commitment. ENTJs value loyalty, intelligence, and competence in their relationships, both personal and professional. They seek partners and friends who appreciate their ambitious nature and support their goals.",
    "The ENTJ's weakness often lies in their intolerance for inefficiency and their impatience with those they perceive as lazy or incompetent. They can be overly critical and demanding, expecting the same level of commitment and performance from others that they expect from themselves. Their focus on the big picture can sometimes lead to overlooking finer details or neglecting to acknowledge the emotional aspects of situations. To balance their dominant traits, ENTJs benefit from developing patience.",
  ],
};

app.use(express.json());
app.use(cors());
let result1 = 0;
let result2 = 0;
// Scoring function for the OEJTS test with normalized results (-2 to 2)
function calculateScores(answers) {
  // 'answers' is expected to be an object where keys are question numbers (1 to 32)
  // and values are the selected numbers (from 1 to 5)
  const Q = answers;

  // Original raw scores based on the provided formula
  const IE = 30 - Q[3] - Q[7] - Q[11] + Q[15] - Q[19] + Q[23] + Q[27] - Q[31];
  const SN = 12 + Q[4] + Q[8] + Q[12] + Q[16] + Q[20] - Q[24] - Q[28] + Q[32];
  const FT = 30 - Q[2] + Q[6] + Q[10] - Q[14] - Q[18] + Q[22] - Q[26] - Q[30];
  const JP = 18 + Q[1] + Q[5] - Q[9] + Q[13] - Q[17] + Q[21] - Q[25] + Q[29];

  // The raw scores for each dimension range from 8 to 40, with a midpoint at 24.
  // We'll normalize them using a linear transformation so that:
  // 8 maps to -2, 24 maps to 0, and 40 maps to 2.
  const normalize = (score) => (score - 24) / 8;
  const IE_norm = normalize(IE);
  const SN_norm = normalize(SN);
  const FT_norm = normalize(FT);
  const JP_norm = normalize(JP);

  // console.log(IE_norm, SN_norm, FT_norm, JP_norm); // Debugging output
  return {
    IE: IE_norm,
    SN: SN_norm,
    FT: FT_norm,
    JP: JP_norm,
  };
}

function calculateScores2(answers) {
  const Q = answers; // Array of answers

  // Calculate raw scores based on question assignments
  const IE_raw = 21 + Q[1] - Q[2] + Q[3] - Q[4] + Q[5] - Q[6] - Q[7];
  const SN_raw = 21 + Q[8] - Q[9] + Q[10] - Q[11] + Q[12] - Q[13] - Q[14];
  const FT_raw = 21 - Q[15] + Q[16] - Q[17] + Q[18] - Q[19] + Q[20] + Q[21];
  const JP_raw = 21 + Q[22] - Q[23] + Q[24] - Q[25] + Q[26] - Q[27] - Q[28];

  // Normalize scores to range [-2, 2]
  const normalize = (score) => (score - 21) / 10.5;

  const IE = normalize(IE_raw);
  const SN = normalize(SN_raw);
  const FT = normalize(FT_raw);
  const JP = normalize(JP_raw);

  // console.log(IE, SN, FT, JP); // Debugging output
  return {
    IE,
    SN,
    FT,
    JP,
  };
}

function calculateAverage() {
  if (!result1 || !result2) {
    return { error: "Scores not available. Please submit both tests first." };
  }

  const IE = ((result1.IE + result2.IE) / 2).toFixed(2);
  const SN = ((result1.SN + result2.SN) / 2).toFixed(2);
  const FT = ((result1.FT + result2.FT) / 2).toFixed(2);
  const JP = ((result1.JP + result2.JP) / 2).toFixed(2);

  const personality =
    (IE > 0 ? "E" : "I") +
    (SN > 0 ? "N" : "S") +
    (FT > 0 ? "T" : "F") +
    (JP > 0 ? "P" : "J");

  return {
    IE,
    SN,
    FT,
    JP,
    personality,
    description: MBTI_Descriptions[personality] || "Unknown personality type",
  };
}

// POST endpoint to receive answers and return the calculated scores and personality type.
app.post("/api/score", (req, res) => {
  const answers = req.body.answers;
  if (!answers || Object.keys(answers).length !== 32) {
    return res.status(400).json({ error: "Please provide all 32 answers." });
  }
  result1 = calculateScores(answers);
  res.json({ message: "Score 1 calculated", result: result1 });
});

app.post("/api/score2", (req, res) => {
  const answers = req.body.answers;
  if (!answers || Object.keys(answers).length !== 28) {
    return res.status(400).json({ error: "Please provide all 28 answers." });
  }
  result2 = calculateScores2(answers);
  res.json({ message: "Score 2 calculated", result: result2 });
});

app.get("/api/result", (req, res) => {
  const results = calculateAverage();
  res.json(results);
});

///
app.get("/api/result", (req, res) => {
  const results = calculateAverage();
  res.json(results);
});

//alphabatical orderd types
const enneagramTypes = {
  A: "The Reformer",
  B: "The Helper",
  C: "The Achiever",
  D: "The Individualist",
  E: "The Investigator",
  F: "The Loyalist",
  G: "The Enthusiast",
  H: "The Challenger",
  I: "The Peacemaker",
};

// POST route to calculate the result based on answers
let sortedScores = [];

app.post("/api/submit", (req, res) => {
  const answers = req.body.answers; // Answers from the frontend (array of objects)

  // Initialize scores for each Enneagram type
  const scores = Object.keys(enneagramTypes).reduce((acc, type) => {
    acc[type] = 0; // Start all types with a score of 0
    return acc;
  }, {});

  // Calculate the score for each Enneagram type
  answers.forEach((answer) => {
    const { type, answer: score } = answer; // Destructure answer object
    if (enneagramTypes[type]) {
      scores[type] += score; // Add the answer score to the corresponding type's score
    }
  });

  // Sort the scores from highest to lowest and include the type name
  sortedScores = Object.keys(scores)
    .map((type) => ({
      typeName: enneagramTypes[type], // Add the type name
      type: type, // The type code (e.g., "A")
      score: scores[type], // The score for the type
    }))
    .sort((a, b) => b.score - a.score); // Sort in descending order of score

  // Send a confirmation response
  res.status(200).json({ message: "Result calculated successfully" });
});

// GET route to fetch sorted scores
app.get("/api/scores", (req, res) => {
  if (sortedScores.length > 0) {
    res.json(sortedScores); // Send the sorted scores if available
  } else {
    res
      .status(404)
      .json({ message: "Scores not found. Please submit the answers first." });
  }
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
