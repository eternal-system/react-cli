import React from 'react'

import css from './style.module.scss'

import logo from '@public/logo192.png'
import DashboardIcon from '@icons/dashboard-project.svg'
import Arrow from '@icons/arrow-back.svg'
import Home from '@icons/home-filled.svg'




export default function WelcomeTips() {
    return(
        <div className={css.wrapper}>
            <p className={css.blot}>Приветственные советы</p>
            <div className={css.content}>
                <img src={logo} className={css.logo} />
                <h1>Добро пожаловать в ваш новый проект!</h1>
                <ul className={css.list}>
                    <li><span><DashboardIcon /></span><span>Сейчас перед вами главная страница проекта, где вы можете разместить различные виджеты. Нажмите кнопку "Настроить" чтобы добавить виджеты! Все изменения автоматически сохраняются.</span></li>
                    <li><span><Arrow /></span><span>Слева находятся различные страницы.'Плагины' позволяет добавлять новые плагины CLI , 'Зависимости' для управления пакетами , 'Конфигурация' чтобы настроить инструменты и "задачи" для выполнения скриптов(например webpack)</span></li>
                    <li><span><Home /></span><span>Вернитесь к менеджеру проектов с помощью выпадающего меню в левом верхнем углу экрана или кнопки "Домой" в строке состояния внизу.</span></li>
                </ul>
            </div>
        </div>
    )
}