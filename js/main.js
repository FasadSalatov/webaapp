let telegramAppChatLabs = window.Telegram.WebApp; //нужно получить объект window.Telegram.WebApp Телеграмма
   telegramAppChatLabs.expand(); //разворачиваем на все окно
   telegramAppChatLabs.MainButton.text = "Кнопка ChatLabst"; //Задаем текст кнопки 
   telegramAppChatLabs.MainButton.setText("ChatLabs на кнопке"); //Меняем текст на кнопке веббота в Телеграмме
   telegramAppChatLabs.MainButton.textColor = "#ff0000"; //Указываем цвет текста, а в данном случае выбран 100% красный
   telegramAppChatLabs.MainButton.color = "#ffffff"; //Делаем бэкграунд кнопки 100% белым
   telegramAppChatLabs.MainButton.setParams({"color": "#000000"}); // Изменяем все параметры
   let button = document.getElementById("button"); //Используем getElementById, чтобы получить кнопку, которую сделали выше и которой присвоили id и class
   button.addEventListener('click', function(){ //Используем addEventListener, чтобы слушать клик по кнопке 
      if (telegramAppChatLabs.MainButton.isVisible){ //проверяем, видима ли кнопка, при помощи isVisible, который предоставляет нам API TG
         telegramAppChatLabs.MainButton.hide() //прячем кнопку
      }
      else{ 
         telegramAppChatLabs.MainButton.show() //если булевое значение isVisible === false, то показываем кнопку, используя show() 
      }
   });

   let btnEdit = document.getElementById("btnEdit"); //Используем getElementById, чтобы получить кнопку и активировать/деактивировать
   btnEdit.addEventListener('click', function(){ //Слушаем при помощи addEventListener клик на кнопку
      if (telegramAppChatLabs.MainButton.isActive){ //Если наша кнопка активна 
         telegramAppChatLabs.MainButton.setParams({"color": "#ffffff"}); //Заменяем цвет на белый
         telegramAppChatLabs.MainButton.disable() //Скрываем кнопку 
      }
      else{ //В противном случае
         telegramAppChatLabs.MainButton.setParams({"color": "#0000ff"}); //Заменяем цвет на синий
         telegramAppChatLabs.MainButton.enable() //Отображаем в веб-боте TelegramWebApp
      }
   });

   Telegram.WebApp.onEvent('mainButtonClicked', function(){
      telegramAppChatLabs.sendData("Проверяем событие onEvent. Если был клик по кнопке, то отправляем данные при помощи sendData в виде данной строки"); 
       });
   let usercard = document.getElementById("usercard"); //Используем getElementById, чтобы получить карточку пользователя 

  let profileName = document.createElement('p'); //При помощи document.createElement делаем абзац – <p> </p>
   profileName.innerText = `${telegramAppChatLabs.initDataUnsafe.user.first_name}
   ${telegramAppChatLabs.initDataUnsafe.user.last_name}
   ${telegramAppChatLabs.initDataUnsafe.user.username} (${telegramAppChatLabs.initDataUnsafe.user.language_code})`;
   //В созданном параграфе будет Имя пользователя, его Фамилия, username, а также код языка
   usercard.appendChild(profileName); //Используем appendChild, чтобы добавить узел в конец списка дочерних элементов
 let userid = document.createElement('p'); // Используем document.createElement для создания еще одного абзаца
   userid.innerText = `${telegramAppChatLabs.initDataUnsafe.user.id}`; // Отображаем id пользователя
   usercard.appendChild(userid); // Добавляем id пользователя в конец списка дочерних элементов при помощи appendChild