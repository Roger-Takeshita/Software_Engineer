# exercise-02 Length of Phrase

# Write the code that:
# 1. Prompts the user to enter a phrase:
#      Please enter a word or phrase: 
# 2. Print the following message:
#      - What you entered is xx characters long
# 3. Return to step 1, unless the word 'quit' was entered.

while True:
   input_word_phrase = input('Please enter a word or phrase ')
   if input_word_phrase == "quit":
      break
   print(f'What you entered is {len(input_word_phrase)} characters long')