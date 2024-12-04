type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
    revealWord: boolean;
  };
  
  export function HangmanWord({ guessedLetters, wordToGuess, revealWord }: HangmanWordProps) {
    return (
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          fontSize: "6rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}
      >
        {wordToGuess.split("").map((letter, index) => (
          <span
            style={{
              borderBottom: "0.5rem solid black",
              marginRight: "1rem",
              color: guessedLetters.includes(letter) || revealWord ? "black" : "red",
            }}
            key={index}
          >
            {guessedLetters.includes(letter) || revealWord ? letter : "_"}
          </span>
        ))}
      </div>
    );
  }