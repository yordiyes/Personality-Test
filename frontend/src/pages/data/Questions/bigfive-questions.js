const questions = {
  openness: [
    { id: 2, text: "I believe in the importance of art.", reverse: false },
    { id: 6, text: "I have a vivid imagination.", reverse: false },
    { id: 21, text: "I do not like art.", reverse: true },
    { id: 26, text: "I avoid philosophical discussions.", reverse: true },
    { id: 28, text: "I enjoy going to art museums.", reverse: false },
    { id: 30, text: "I am interested in the meaning of things.", reverse: false },
    { id: 36, text: "I am not interested in abstract ideas.", reverse: true },
    { id: 39, text: "I enjoy hearing new ideas.", reverse: false } ,
    { id: 41, text: "Original" },
    { id: 46, text: "Inquisitive" },
    { id: 51, text: "Creative" },
    { id: 56, text: "Imaginative" }
  ],
  conscientiousness: [
    { id: 5, text: "I am always prepared.", reverse: false },
    { id: 11, text: "I get chores done right away.", reverse: false },
    { id: 22, text: "I stop what I am doing to help other people.", reverse: false },
    { id: 29, text: "I always make good use of my time.", reverse: false },
    { id: 31, text: "I avoid taking on a lot of responsibility.", reverse: true },
    { id: 35, text: "I make plans and stick to them.", reverse: false },
    { id: 40, text: "It’s important to me that people are on time.", reverse: false },
    { id: 42, text: "Systematic" },
    { id: 52, text: "Self-Disciplined" },
    { id: 57, text: "Organized" },
    { id :17, text: "If ind it difficult to get to work"},
    { id :25, text: " I feel comfortable with myself"}
  ],
  statements: [
    { id: 7, text: "I feel comfortable around people.", reverse: false },
    { id: 9, text: "I am the life of the party.", reverse: false },
    { id: 13, text: "I am skilled in handling social situations.", reverse: false },
    { id: 18, text: "I stay in the background.", reverse: true },
    { id: 27, text: "I have a lot to say.", reverse: false },
    { id: 32, text: "I don't like to draw attention to myself.", reverse: true },
    { id: 34, text: "I make friends easily.", reverse: false },
    { id: 38, text: "I don't talk a lot.", reverse: true },
    { id: 43, text: "Shy" },
    { id: 48, text: "Reserved" },
    { id: 53, text: "Outgoing" },
    { id: 58, text: "Talkative" }
  ],
  agreeableness: [
    { id: 1, text: "I accept people the way they are.", reverse: false },
    { id: 4, text: "I take care of other people before taking care of myself.", reverse: false },
    { id: 10, text: "I treat everyone with kindness and sympathy.", reverse: false },
    { id: 12, text: "I have a kind word for everyone.", reverse: false },
    { id: 15, text: "I start arguments just for the fun of it.", reverse: true },
    { id: 22, text: "I feel I am better than other people.", reverse: true },
    { id: 33, text: "I criticize other people.", reverse: true },
    { id: 37, text: "I stop what I am doing to help other people.", reverse: false },
    { id: 44, text: "Soft-Hearted" },
    { id: 49, text: "Agreeable" },
    { id: 59, text: "Humble" },
    { id: 47, text: "Forgetful" }
  ],

  neuroticism: [
    { id: 3, text: "My moods change easily.", reverse: false },
    { id: 8, text: "I often feel blue.", reverse: false },
    { id: 14, text: "I often feel anxious about what could go wrong.", reverse: false },
    { id: 16, text: "I often worry that I am not good enough.", reverse: false },
    { id: 19, text: "There are many things that I do not like about myself.", reverse: false },
    { id: 20, text: "I seldom feel blue.", reverse: true },
    { id: 23, text: "I change my plans frequently.", reverse: true },
    { id: 24, text: "I am often troubled by negative thoughts.", reverse: false },
    { id: 45, text: "Tense" },
    { id: 50, text: "Nervous" },
    { id: 55, text: "Moody" },
    { id: 60, text: "Pessimistic" }
  ]
};

export default questions;