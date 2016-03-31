data RPS = Rock
         | Paper
         | Scissors
         deriving (Eq, Read, Show)

instance Ord RPS where
  compare Rock x
    | x == Rock     = EQ
    | x == Paper    = LT
    | x == Scissors = GT
  compare Paper x
    | x == Rock     = GT
    | x == Paper    = EQ
    | x == Scissors = LT
  compare Scissors x
    | x == Rock     = LT
    | x == Paper    = GT
    | x == Scissors = EQ

getPlayer :: String -> IO String
getPlayer promptStr = do
  putStr promptStr
  putStrLn " enter your play (Rock|Paper|Scissors):"
  getLine

playGame :: IO ()
playGame = do
  p1 <- getPlayer "Player 1"
  p2 <- getPlayer "Player 2"
  case compare (read p1 :: RPS) (read p2 :: RPS) of
    GT -> print "Player 1 wins"
    LT -> print "Player 2 wins"
    EQ -> playGame

main = playGame
