export interface ClassroomRoom {
  roomID: string
  name: string
  password: string
  isLive: boolean
  createdAt: number
}

declare global {
  // eslint-disable-next-line no-var
  var __HDP_CLASSROOM_STORE__: ClassroomRoom[] | undefined
}

const DEFAULT_ROOMS: ClassroomRoom[] = [
  {
    roomID: 'hdpedu-live',
    name: 'HDP Edu Live',
    password: 'hdp123',
    isLive: true,
    createdAt: Date.now(),
  },
]

function getStore() {
  if (!globalThis.__HDP_CLASSROOM_STORE__) {
    globalThis.__HDP_CLASSROOM_STORE__ = [...DEFAULT_ROOMS]
  }
  return globalThis.__HDP_CLASSROOM_STORE__
}

export function slugifyRoomName(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function listLiveRooms() {
  return getStore()
    .filter((room) => room.isLive)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((room) => ({ roomID: room.roomID, name: room.name, createdAt: room.createdAt }))
}

export function createRoom(name: string, password: string) {
  const cleanName = name.trim()
  const cleanPassword = password.trim()

  if (!cleanName) {
    throw new Error('Ten lop hoc khong duoc de trong.')
  }
  if (!cleanPassword || cleanPassword.length < 4) {
    throw new Error('Mat khau phai co it nhat 4 ky tu.')
  }

  const baseId = slugifyRoomName(cleanName)
  if (!baseId) {
    throw new Error('Ten lop hoc khong hop le.')
  }

  const store = getStore()
  let roomID = baseId
  let suffix = 1

  while (store.some((room) => room.roomID === roomID)) {
    suffix += 1
    roomID = `${baseId}-${suffix}`
  }

  const room: ClassroomRoom = {
    roomID,
    name: cleanName,
    password: cleanPassword,
    isLive: true,
    createdAt: Date.now(),
  }

  store.push(room)
  return { roomID: room.roomID, name: room.name, createdAt: room.createdAt }
}

export function verifyRoomPassword(roomID: string, password: string) {
  const room = getStore().find((item) => item.roomID === roomID && item.isLive)
  if (!room) {
    return { ok: false as const, reason: 'not_found' as const }
  }

  if (room.password !== password.trim()) {
    return { ok: false as const, reason: 'wrong_password' as const }
  }

  return { ok: true as const, room }
}

export function getRoom(roomID: string) {
  return getStore().find((item) => item.roomID === roomID && item.isLive) || null
}
