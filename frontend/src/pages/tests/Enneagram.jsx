import React from "react";

const EnneagramData = {
  pages: [
    {
      page: 1,
      questions: [
        { id: 1, text: "I don't get depressed easily, if at all.", type: 7 },
        {
          id: 2,
          text: "I love to take care of people and I'm good at it.",
          type: 2,
        },
        {
          id: 3,
          text: "Success, prestige, and recognition really matter to me.",
          type: 3,
        },
        {
          id: 4,
          text: "I plan the next adventure before the current one is finished.",
          type: 7,
        },
        {
          id: 5,
          text: "I want to win the approval of those in authority, sometimes even when I don't really like them.",
          type: 6,
        },
        {
          id: 6,
          text: "I am more sensitive than most people; sometimes the world just seems too harsh.",
          type: 4,
        },
        { id: 7, text: "I tend to trust most people.", type: 9 },
        {
          id: 8,
          text: "I often refrain from acting, as I'm afraid of being overwhelmed.",
          type: [5, 9],
        },
        { id: 9, text: "I am too strict with myself and others.", type: 1 },
      ],
    },
    {
      page: 2,
      questions: [
        {
          id: 10,
          text: "I am always aware of what needs to be corrected.",
          type: 1,
        },
        {
          id: 11,
          text: "I am uncomfortable when people want an emotional response from me.",
          type: 5,
        },
        {
          id: 12,
          text: "It's important to me that I be admired by others - and many people do admire me.",
          type: 3,
        },
        {
          id: 13,
          text: "It's hard for me to put my feelings aside, even to get a job done.",
          type: 2,
        },
        { id: 14, text: "I am skeptical, suspicious and doubtful.", type: 6 },
        {
          id: 15,
          text: "In most close relationships, I give more than I take.",
          type: 2,
        },
        {
          id: 16,
          text: "I could probably use a little more ambition.",
          type: 9,
        },
        {
          id: 17,
          text: "I don't see much point in wallowing in negative emotions. When I begin to feel anxious, I tend to throw myself into distracting activities.",
          type: 7,
        },
        { id: 18, text: "I'm pretty domineering.", type: 8 },
      ],
    },
    {
      page: 3,
      questions: [
        { id: 19, text: "I avoid expressing strong emotions.", type: 5 },
        { id: 20, text: "I'm a true romantic.", type: 4 },
        {
          id: 21,
          text: "Personal relationships are by far the most important thing in my life.",
          type: 2,
        },
        {
          id: 22,
          text: "For better or worse, I compare myself to others to assess how I'm doing.",
          type: 3,
        },
        {
          id: 23,
          text: "Even though it is frequently irrational, I sometimes worry whether people are talking about me behind my back.",
          type: 6,
        },
        {
          id: 24,
          text: "It's easy for me to accept other people, and they seem comfortable around me because I don't judge them.",
          type: 9,
        },
        { id: 25, text: "I am more organized than most.", type: 1 },
        {
          id: 26,
          text: "Your happiness and your feelings are your responsibility, not mine.",
          type: 8,
        },
        {
          id: 27,
          text: "I don't mind taking a risk; I really like to beat the odds.",
          type: 7,
        },
      ],
    },
    {
      page: 4,
      questions: [
        {
          id: 28,
          text: "I'm quite unobtrusive and easy to get along with.",
          type: 9,
        },
        { id: 29, text: "I am more loving than most people.", type: 2 },
        {
          id: 30,
          text: "While I am very loyal myself, I frequently worry that others are not going to be loyal to me.",
          type: 6,
        },
        {
          id: 31,
          text: "I am a good networker; I know how to make connections.",
          type: 3,
        },
        {
          id: 32,
          text: "I get bored more easily than most people; I am always looking for new experiences.",
          type: 7,
        },
        { id: 33, text: "Rules annoy me.", type: 8 },
        { id: 34, text: "I am more formal than most people.", type: 1 },
        { id: 35, text: "I am highly individualistic.", type: 4 },
        {
          id: 36,
          text: "I want to observe and think, without giving myself away, before I go into action.",
          type: 5,
        },
      ],
    },
    {
      page: 5,
      questions: [
        {
          id: 37,
          text: "I often resent it when I see people doing a slack job.",
          type: 1,
        },
        {
          id: 38,
          text: "People are attracted to me because I impress them.",
          type: 3,
        },
        {
          id: 39,
          text: "I don't like commitment. Who wants to be locked into something, especially if something better presents itself?",
          type: 7,
        },
        {
          id: 40,
          text: "I come on pretty strong and can sometimes intimidate people.",
          type: 8,
        },
        {
          id: 41,
          text: "I am more temperamental than most but it's because my feelings are so strong.",
          type: 4,
        },
        {
          id: 42,
          text: "I try to get closer to people by being generous with my time and energy.",
          type: 2,
        },
        {
          id: 43,
          text: "Nobody likes to be intruded upon, but I hate it!",
          type: 9,
        },
        {
          id: 44,
          text: "I am attuned to anything that might be dangerous and I am security conscious.",
          type: 6,
        },
        {
          id: 45,
          text: "I go along with what others want unless I have a very strong desire of my own, which I usually don't.",
          type: 9,
        },
      ],
    },
    {
      page: 6,
      questions: [
        {
          id: 46,
          text: "It's important to me to feel as though I 'belong.'",
          type: 6,
        },
        {
          id: 47,
          text: "I am drawn to emotional intensity and am not afraid to explore the depths.",
          type: 4,
        },
        { id: 48, text: "I tend to avoid conflict.", type: 9 },
        {
          id: 49,
          text: "I see life as a struggle that I intend to win.",
          type: 8,
        },
        {
          id: 50,
          text: "When making a decision, I often ask myself 'which option will yield the maximum enjoyment?'.",
          type: 7,
        },
        {
          id: 51,
          text: "I am meticulous and fastidious, even about details that other people find minor.",
          type: 1,
        },
        {
          id: 52,
          text: "If I'm not careful, I can get too isolated from others.",
          type: 5,
        },
        {
          id: 53,
          text: "Sometimes I have overextended myself in trying to help people.",
          type: 2,
        },
        {
          id: 54,
          text: "I am competitive and ambitious, but I do not think of myself as cut throat.",
          type: 3,
        },
      ],
    },
    {
      page: 7,
      questions: [
        { id: 55, text: "No one would ever call me selfish!", type: 2 },
        { id: 56, text: "I'm a big procrastinator.", type: 9 },
        {
          id: 57,
          text: "To deal with the fear I always have, I'm as nice and warm as possible towards everyone.",
          type: 6,
        },
        {
          id: 58,
          text: "It's strange but I think that there is something beautiful about sadness.",
          type: 4,
        },
        {
          id: 59,
          text: "It's really hard for me to save money as I tend to spend beyond my limits.",
          type: 7,
        },
        {
          id: 60,
          text: "I welcome a good fight as it clears the air.",
          type: 8,
        },
        {
          id: 61,
          text: "I don't tend to over commit myself - I have a limited amount of time and energy.",
          type: 9,
        },
        {
          id: 62,
          text: "It would be the worst thing to be seen by others as a loser.",
          type: 3,
        },
        { id: 63, text: "I hold a tight rein on my temper.", type: 1 },
      ],
    },
    {
      page: 8,
      questions: [
        { id: 64, text: "I am good at getting things done.", type: 3 },
        { id: 65, text: "I almost never lose control of myself.", type: 8 },
        {
          id: 66,
          text: "I accumulate lots of knowledge to counteract my lack of self-confidence.",
          type: 5,
        },
        {
          id: 67,
          text: "I want to be noticed but it also makes me uncomfortable.",
          type: 4,
        },
        { id: 68, text: "I am more sentimental than others.", type: 2 },
        {
          id: 69,
          text: "I think it's weak to back down from confrontation.",
          type: 8,
        },
        {
          id: 70,
          text: "I'm constantly on the lookout for things that might go wrong.",
          type: 6,
        },
        {
          id: 71,
          text: "If something doesn't go my way, I can find something beneficial about it.",
          type: 7,
        },
        {
          id: 72,
          text: "Usually I just focus on the positive sides of people, as focusing on negative traits or events does not help making relationships more harmonious.",
          type: 9,
        },
      ],
    },
    {
      page: 9,
      questions: [
        { id: 73, text: "I can't rest until the job is done.", type: 1 },
        {
          id: 74,
          text: "Most people don't know that I am actually really sensitive, as I tend to conceal my emotions.",
          type: 4,
        },
        {
          id: 75,
          text: "I'm not a show off, in fact I have probably been too modest.",
          type: 3,
        },
        {
          id: 76,
          text: "I'm a brainstormer. For every problem, I can think of 10 approaches to a solution.",
          type: 7,
        },
        {
          id: 77,
          text: "Change - whether to a new job or new school, makes me more anxious than it does most people.",
          type: 6,
        },
        { id: 78, text: "I'm pretty tough.", type: 8 },
        {
          id: 79,
          text: "I don't let it show, but if I'm with someone who is as unique as I am, I get a bit jealous.",
          type: 4,
        },
        {
          id: 80,
          text: "Others need my assistance much more than I need theirs.",
          type: 2,
        },
        {
          id: 81,
          text: "It is important to me that I win the respect of others.",
          type: 3,
        },
      ],
    },
    {
      page: 10,
      questions: [
        {
          id: 82,
          text: "I want to enjoy things, so I'm not very disciplined.",
          type: 7,
        },
        {
          id: 83,
          text: "I often lose my focus as my attention tends to drift off from the main issues.",
          type: 9,
        },
        {
          id: 84,
          text: "It takes me quite a lot of time and effort to make important decisions and I frequently second guess myself.",
          type: 6,
        },
        {
          id: 85,
          text: "I generally appear calm and even tempered, even when I am under an enormous strain.",
          type: 9,
        },
        {
          id: 86,
          text: "I have a compulsion to do things the right way, even if it's not cost effective.",
          type: 1,
        },
        {
          id: 87,
          text: "I have been told that I lack tact but I think the important thing is to tell the truth.",
          type: 8,
        },
        { id: 88, text: "I am more dramatic than most.", type: 4 },
        {
          id: 89,
          text: "People see me as a warm and sympathetic person.",
          type: 2,
        },
        {
          id: 90,
          text: "I tend not to consider asking help from others, even from those I love.",
          type: 5,
        },
      ],
    },
    {
      page: 11,
      questions: [
        {
          id: 91,
          text: "Life's about give and take, so giving love is the most important thing in my life.",
          type: 2,
        },
        {
          id: 92,
          text: "My tendency to tell people what's wrong and what they should do about it has sometimes annoyed them.",
          type: 8,
        },
        { id: 93, text: "I'm not comfortable with self-revelation.", type: 5 },
        {
          id: 94,
          text: "I have more energy and strength than most people.",
          type: 8,
        },
        {
          id: 95,
          text: "People often aren't what they seem, so I can really be suspicious of their motives.",
          type: 6,
        },
        { id: 96, text: "It's hard to stay passionate and focused.", type: 7 },
        {
          id: 97,
          text: "I generally don't like to stay at one task for very long. I get restless and want to move onto something else.",
          type: 7,
        },
        {
          id: 98,
          text: "I tend to escape reality into a world of idealized fantasy.",
          type: 4,
        },
        {
          id: 99,
          text: "Even if I don't have it all together, at least I'm going to seem to have it all together.",
          type: 3,
        },
      ],
    },
    {
      page: 12,
      questions: [
        {
          id: 100,
          text: "I tend to have mixed feelings about many people.",
          type: 5,
        },
        {
          id: 101,
          text: "I'm really good with the big picture but I don't have much patience with detail work.",
          type: 7,
        },
        {
          id: 102,
          text: "I have been told I am a perfectionist and I suppose it is true.",
          type: 1,
        },
        { id: 103, text: "I'll do what it takes to be successful.", type: 3 },
        {
          id: 104,
          text: "I usually fall asleep readily and can even take a nap when I'm stressed out.",
          type: 9,
        },
        {
          id: 105,
          text: "I think best on my feet, so I tend to move into action before I've thought it through.",
          type: 7,
        },
        {
          id: 106,
          text: "I'm proud of the fact that many people depend on me.",
          type: 2,
        },
        {
          id: 107,
          text: "Sometimes I don't know what I'm feeling until I've had a chance to think about it.",
          type: 5,
        },
        {
          id: 108,
          text: "The aesthetics of my surroundings has a strong influence on my mood.",
          type: 4,
        },
      ],
    },
    {
      page: 13,
      questions: [
        {
          id: 109,
          text: "It really bothers me when people don't say thank you.",
          type: 2,
        },
        {
          id: 110,
          text: "I sometimes forget to do something that another person has been pushing me to do.",
          type: 9,
        },
        {
          id: 111,
          text: "I have a real sensitivity to how my presentation is affecting others and I can alter it if I have to.",
          type: 3,
        },
        { id: 112, text: "When I've arrived, the party starts.", type: 7 },
        {
          id: 113,
          text: "I don't give a damn about morality but I've got my own brand of integrity.",
          type: 8,
        },
        {
          id: 114,
          text: "While I value my close relationships, I often feel most myself when I am alone.",
          type: 5,
        },
        {
          id: 115,
          text: "I enjoy remembering the past even if it is a bit melancholic.",
          type: 4,
        },
        {
          id: 116,
          text: "I can easily imagine all the things that might go wrong, as I have a really vivid imagination.",
          type: 6,
        },
        { id: 117, text: "I seldom compromise my principles.", type: 1 },
      ],
    },
    {
      page: 14,
      questions: [
        {
          id: 118,
          text: "I see all points of view when there is a dispute, so it's hard for me to take a side.",
          type: 9,
        },
        { id: 119, text: "I have strong physical appetites.", type: 8 },
        { id: 120, text: "I'm good at motivating people.", type: 2 },
        {
          id: 121,
          text: "I sometimes wish people would take care of me for a change.",
          type: 6,
        },
        {
          id: 122,
          text: "My life has been permeated by a sense of longing.",
          type: 4,
        },
        {
          id: 123,
          text: "Sometimes I am too critical of others but I am much harder on myself than I am on others.",
          type: 1,
        },
        {
          id: 124,
          text: "I secretly fear deprivation and being without the nicer things of life.",
          type: 7,
        },
        {
          id: 125,
          text: "I tend to either comply completely or to rebel.",
          type: 6,
        },
        {
          id: 126,
          text: "When I really get involved in an intellectual problem that stimulates me, I tend to detach from my emotions.",
          type: 5,
        },
      ],
    },
  ],
};

const Enneagram = () => {
  return <div>eneeeagram test</div>;
};

export default Enneagram;
