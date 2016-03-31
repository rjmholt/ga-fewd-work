target_temperature = 72

get_target_temp :: (Ord a, Num a) => a -> a -> a
get_target_temp targ temp
  | targ > (temp+5) = get_target_temp targ (temp+1)
  | targ <= temp    = get_target_temp targ (temp-1)
  | otherwise       = temp

main = do
  putStrLn "What is the target temperature? "
  tempStr <- getLine
  putStrLn "What is the current temperature? "
  targStr <- getLine
  let temp = tempStr :: Int
  let targ = targStr :: Int
  print $ get_target_temp targ temp
