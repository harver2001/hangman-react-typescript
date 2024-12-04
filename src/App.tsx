import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter)) return;
      setGuessedLetters([...guessedLetters, letter]);
    },
    [guessedLetters]
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (!letter.match(/^[a-z]$/)) return;
      event.preventDefault();
      addGuessedLetters(letter);
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [guessedLetters, addGuessedLetters]);

  useEffect(() => {
    if (isLoser || isWinner) {
      setGameOver(true);
      setTimeout(() => {
        alert(`The word was: ${wordToGuess}`);
        window.location.reload();
      }, 100);
    }
  }, [isLoser, isWinner, wordToGuess]);

  return (
    <div>
      <div
        style={{
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "2rem", textAlign: "center" }}>
          {isLoser ? "You Lose!" : isWinner ? "You Win!" : "Hangman"}
        </div>
        <HangmanDrawing numberofGuesses={incorrectLetters.length} />
        <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} revealWord={isLoser || isWinner} />
        <div style={{ alignSelf: "stretch" }}>
          <Keyboard
            activeLetters={guessedLetters.filter((letter) =>
              guessedLetters.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetters={addGuessedLetters}
          />
        </div>
      </div>
    </div>
  );
}

export default App;