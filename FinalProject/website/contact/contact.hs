import Data.Char
import Data.Bits
import Control.Monad.State.Lazy

s = "rjmholt@gmail.com"
iv = 0x21817

e (c:cs) = do
  k <- get
  let k' = k `xor` c
  put k'
  ks <- e cs
  return (k:ks)

f l = evalState l iv

main = print $ f s
