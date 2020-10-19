/**
 * Russian locale
 */
const locale = {
  common: {
    path: 'Путь',
    reset: 'сбросить',
    newFolder: 'новая папка',
    select: 'Выбрать',
    connect: 'Подключение к UI серверу',
    disconnect: 'Нет соединения с UI сервером',
    logs: 'Логи'
  },
  project: {
    headerTitle: 'React Проектный менеджер',
    projects: 'Проекты',
    create: 'Создать',
    import: 'Импорт',
    notFoundProjects: 'Не найдено проектов',
    folders: 'Папки',
    createNewProject: 'Создать новый проект',
    importProject: 'Избранное',
    favoriteProjects: 'Любимые проекты',
    otherProjects: 'Другие проекты',
    emptyFavoriteFolders: 'Избраные папки отсутствуют',
    openEditor: 'Открыть в редакторе',
    projectManagerReact: 'Менеджер проектов React'
  },
  projectCreate: {
    createProjectTitle: 'Создание нового проекта',
    nameProject: 'Название проекта',
    createProject: 'Создать проект',
    packageManager: 'Пакетный менеджер',
    selectPreset: 'Выбор базовых настроек',
    typeName: 'Введите имя',
    creatingProject: 'Создание проекта'
  },
  dashboard: {
    dashboard: 'Панель',
    dependencies: 'Зависимости',
    tasks: 'Задачи',
    titleDashboar: 'Панель инструментов проекта',
    titleTasks: 'Задачи проекта'
  },
  dependencies: {
    titleDepend: 'Зависимости проекта',
    main: 'Основные зависимости',
    dev: 'Зависимости для разработке',
    version: 'версия',
    installed: 'установлен',
    noInstalled: 'не установлен',
    moreInfo: 'Больше информации',
    install: 'Установить пакет',
    update: 'Обновить пакеты',
    type: 'Тип',
    search: 'Поиск пакета',
    npmInstall: 'Установка',
    npmUninstall: 'Удаление'
  },
  modal: {
    selectFolder: 'Выбор директории',
    titleDepend: 'Установка зависимостей',
    createNew: 'Добавить новую папку',
    create: 'Добавить',
    title: 'Заголовок',
    newFolder: 'Новая папка',
    install: 'Установить',
    cancel: 'Отмена'
  },
  welcometips: {
    blot: 'Приветственные советы',
    welcome: 'Добро пожаловать в ваш новый проект!',
    tip1: 'Сейчас перед вами главная страница проекта, где вы можете разместить различные виджеты. Нажмите кнопку "Настроить" чтобы добавить виджеты! Все изменения автоматически сохраняются.',
    tip2: 'Слева находятся различные страницы."Плагины" позволяет добавлять новые плагины CLI , "Зависимости" для управления пакетами , "Конфигурация" чтобы настроить инструменты и "задачи" для выполнения скриптов(например webpack)',
    tip3: 'Вернитесь к менеджеру проектов с помощью выпадающего меню в левом верхнем углу экрана или кнопки "Домой" в строке состояния внизу.'
  },
  toolbar: {
    projects: {
      add: 'Добавить/убрать в избранное',
      edit: 'Переименовать',
      delete: 'Удалить',
      tasks: 'Задачи',
      open: 'Открыть в редакторе',
      noData: 'Нет данных'
    },
    tooltip: {
      back: 'Назад',
      folder: 'В начало',
      path: 'Задать путь',
      update: 'Обновить',
      favorite: 'Добавить в избранное',
      newFolder: 'Создать папку'
    }
  }
}

export default locale
