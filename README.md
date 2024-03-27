# Lesson learn

- log in worker thread could increase ram and cpu usage (not in main thread)
  - Possible cause: message in worker thread have to move back to main thread
