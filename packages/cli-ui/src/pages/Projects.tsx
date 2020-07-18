import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { Layout, Content, Empty, ProjectFilter, ProjectList, Loader } from '../components'
import { useNotification } from 'hooks'
import { SettingsContext } from '../context'

export interface Project {
  id: number;
  manager: string;
  name: string;
  path: string;
  preset: string;
}

export default function Projects () {
	const { t } = useTranslation('project')
	const notification = useNotification()
	const { socket } = useContext(SettingsContext)

	const [projects, setProjects] = useState<Project[]>([])
	const [projectsFavorite, setFavoriteProjects] = useState<Project[]>([])

	const [filters, setFilters] = useState<Project[]>([])
	const [filtersFavorite, setFiltersFavorite] = useState<Project[]>([])

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		socket.send({
			type: 'GET_PROJECTS'
		})

		socket.send({
			type: 'GET_FAVORITE_PROJECTS'
		})

		socket.on('projects', (res) => {
			batch(() => {
				setLoading(true)
				setProjects(res.data)
				setFilters(res.data)
			setTimeout(() => {
				setLoading(false)
			}, 300)
			})
		})

		socket.on('projectsFavorite', (res) => {
			batch(() => {
				setLoading(true)
				setFavoriteProjects(res.data)
				setFiltersFavorite(res.data)
				setTimeout(() => {
					setLoading(false)
				}, 300)
			})
		})

		socket.on('erro', (error) => {
			setLoading(true)
			notification.error({
				title: error.message,
				message: error.error.path
			})
		})

	return () => {
			socket.off('projects')
			socket.off('projectsFavorite')
			socket.off('erro')
		}
	}, [])

	function handleFavorite (id: number) {
		console.log('favorite', id)
		socket.send({
			type: 'ADD_FAVORITE_BY_ID',
			id
		})
	}

	function handleDelete (id: number): void {
		console.log('delete', id)
		socket.send({
			type: 'DELETE_PROJECT_BY_ID',
			id
		})
	}

	if (loading) {
		return (
			<Layout>
				<Content>
					<Loader />
				</Content>
			</Layout>
		)
	}

	return (
		<Layout>
		<Content>
			{ projects.length
			? <ProjectFilter 
					projects={projects} 
					onChange={setFilters} 
				/>
			: null}
			{ filters.length
			? <ProjectList 
					favorits={filtersFavorite} 
					projects={filters} 
					onFavorite={handleFavorite} 
					onDelete={handleDelete}
				/>
			: <Empty text={t('notFoundProjects')} /> }
		</Content>
		</Layout>
	)
}
