module.exports.hello = async (event) => {
  let inputValue, outputValue
  console.log(event.body)

  if (event.body) {

    let body = JSON.parse(event.body)

    // 추가 도전과제: body가 { input: 숫자 } 가 맞는지 검증하고, 검증에 실패하면 응답코드 400 및 에러 메시지를 반환하는 코드를 넣어봅시다.

    inputValue = parseInt(body.input)
    outputValue = inputValue + 1
  }

  const message = `메시지를 받았습니다. 입력값: ${inputValue}, 결과: ${outputValue}`

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message
      },
      null,
      2
    ),
  };
};