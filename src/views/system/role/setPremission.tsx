import api from "@/api";
import { Menu, Role } from "@/types/api";
import { IAction, IModalProp } from "@/types/modal";
import { message } from "@/utils/AntdGlobal";
import { Form, Input, Modal, Tree } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useImperativeHandle, useState } from "react";

export default function SetPremission(props: IModalProp<Role.RoleItem>) {
	const [visible, setVisible] = useState(false)
	const [checkedKeys, setCheckedKeys] = useState<string[]>([])
	const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
	const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
	const [permission, setPermission] = useState<Role.Permission>()

	useEffect(() => {
		getMenuList()
	}, [])

	const getMenuList = async () => {
		const menuList = await api.getMenuList()
		setMenuList(menuList)
	}

	//暴露组件方法
	useImperativeHandle(props.mRef, () => {
		return {
			open
		}
	})
	const open = (type: IAction, data?: Role.RoleItem) => {
		setVisible(true)
		setRoleInfo(data)
		setCheckedKeys(data?.permissionList.checkedKeys || [])
	}

	//取消
	const handleCancle = () => {
		setVisible(false)
		setPermission(undefined)
	}
	const onCheck = (checkedKeysValue: any, item: any) => {
		setCheckedKeys(checkedKeysValue)
		const checkedKeys:string[] = []
		const parentKeys: string[] = []
		item.checkedNodes.map((node:Menu.MenuItem)=>{
			if(node.menuType === 2) {
				checkedKeys.push(node._id)
			} else {
				parentKeys.push(node._id)
			}
		})
		setPermission({
			_id: roleInfo?._id || '',
			permissionList: {
				checkedKeys,
				halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys)
			}
		})
	}
	const handleOk = async ()=> {
		if(permission){
			await api.updatePermission(permission)
			message.success('权限设置成功')
			handleCancle()
			props.update()
		}
	}
	return (
		<Modal
			title='设置权限'
			width={600}
			open={visible}
			okText='确定'
			cancelText='取消'
			onOk={handleOk}
			onCancel={handleCancle}>

			<Form labelAlign="right" labelCol={{ span: 4 }}>
				<FormItem label='角色名称'>
					{roleInfo?.roleName}
				</FormItem>

				<FormItem label='权限'>
					<Tree
						checkable
						onCheck={onCheck}
						checkedKeys={checkedKeys}
						treeData={menuList}
						defaultExpandAll
						fieldNames={{
							title: 'menuName',
							key: '_id',
							children: 'children'
						}}
					/>
				</FormItem>
			</Form>
		</Modal>

	)
}

