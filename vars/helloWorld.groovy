def call(Map config = [:]) {
  echo "hello ${config.name}, nice to meet you ${config.day}. Just for testing ${config.test}"
}
