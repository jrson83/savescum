import { useAppStore } from '@/store'
import type { PlayStation } from '@/types'
import { Button, FormGroup, Input, Label } from '@shrtcss/react'
import { useForm } from '@shrtcss/react-hooks'

export default function ConsoleForm() {
  const consoles = useAppStore((state) => state.consoles)
  const addConsole = useAppStore((state) => state.addConsole)

  const { handleSubmit, handleChange, data, errors } = useForm<PlayStation>({
    validations: {
      title: {
        pattern: {
          value: '^[a-zA-Z0-9_.-]*$',
          message: 'Please provide a valid title.',
        },
      },
      ip: {
        pattern: {
          value:
            '^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
          message: 'Please provide a valid IP address.',
        },
      },
      port: {
        custom: {
          isValid: (value) => typeof parseInt(value, 10) === 'number',
          message: 'Please provide a valid port number.',
        },
      },
      user: {
        pattern: {
          value: '^[a-zA-Z0-9_.-]*$',
          message: 'Please provide a valid username.',
        },
      },
    },
    initialValues: consoles[0],
    onSubmit: (e) => {
      e?.preventDefault
      addConsole(data)
    },
  })

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup label="Title">
        <Input
          id="input-title"
          placeholder="Title e.g. PlayStation 4"
          type="text"
          value={data.title}
          onChange={handleChange('title')}
          autoComplete="off"
          required
        />
        <Label htmlFor="input-title" error={errors.user}>
          Configure the console title e.g. <code>PlayStation 4</code>
        </Label>
      </FormGroup>
      <FormGroup label="IP Address">
        <Input
          id="input-ip"
          type="text"
          placeholder="192.168.178.69"
          value={data.ip}
          pattern="^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
          onChange={handleChange('ip')}
          autoComplete="off"
          required
        />
        <Label htmlFor="input-ip" error={errors.ip}>
          Configure the ip address of the FTP-Server
        </Label>
      </FormGroup>
      <FormGroup label="Port">
        <Input
          id="input-port"
          placeholder="2121"
          type="number"
          value={data.port}
          min="1"
          onChange={handleChange<number>('port', (value) =>
            parseInt(value, 10)
          )}
          autoComplete="off"
          required
        />
        <Label htmlFor="input-port" error={errors.port}>
          Configure the port (<code>default: 2121, 1337</code>)
        </Label>
      </FormGroup>
      <FormGroup label="Username">
        <Input
          id="input-user"
          placeholder="User"
          type="text"
          value={data.user}
          onChange={handleChange('user')}
          autoComplete="off"
          required
        />
        <Label htmlFor="input-user" error={errors.user}>
          Configure the username (<code>default: anonymous</code>)
        </Label>
      </FormGroup>
      <FormGroup label="Password">
        <Input
          id="input-password"
          placeholder="********"
          type="password"
          value={data.password}
          onChange={handleChange('password')}
          autoComplete="off"
        />
        <Label htmlFor="input-password" error={errors.password}>
          Configure the password (<code>default: empty</code>)
        </Label>
      </FormGroup>
      <div className="btn-container-right">
        <Button
          type="submit"
          className="btn btn-info"
          disabled={!data.ip || !data.port || !data.user}
        >
          Save
        </Button>
      </div>
    </form>
  )
}
