// JavaScript Class

class Person {
  firstName: string
  lastName: string
  date: Date

  constructor(payload) {
    this.firstName = payload.firstName
    this.lastName = payload.lastName
    this.date = payload.date
  }

  getFullName(): string {
    return this.firstName + ' ' + this.lastName
  }

  getAge(): number {
    let age = 0

    const birthYear = this.date.getFullYear()
    const currentYear = new Date().getFullYear()

    age = currentYear - birthYear

    return age
  }
}

const person1 = new Person({ firstName: 'Salim', lastName: 'Rana', date: new Date(1989, 3, 28, 12) })
const person2 = new Person({ firstName: 'Wasim', lastName: 'Hasan', date: new Date(1992, 11, 7, 12) })
const person3 = new Person({ firstName: 'Rubel', lastName: 'Hosen', date: new Date(1989, 0, 5, 12) })

// console.log(person1.getAge(), person2.getAge(), person3.getAge(), person1.getFullName(), person2.getFullName(), person3.getFullName());

// Understand complex class

class Vue {
  rootDiv: HTMLElement
  html: string
  renderedHtml: string
  methods: object

  constructor(payload: { data: Object; methods: Object; computed: Object; html: string }) {
    for (const key in payload.data) {
      this[key] = payload.data[key]
    }

    for (const key in payload.computed) {
      this[key] = payload.computed[key]
    }

    this.methods = payload.methods

    this.html = payload.html
  }

  mount(div: string) {
    this.rootDiv = document.getElementById(div)

    this.render()

    // Perform actions from methods
    for (const key in this.methods) {
      const elm = document.getElementById(this[`${key}Id`])

      elm.addEventListener(`${this[`${key}Id`].split('-')[1]}`, (e) => {
        this.methods[key].apply(this, [e])

        this.render()
      })
    }

    const win = window as any
    win.$app = this
  }

  generateActualHtml() {
    if (this.html) {
      let result = this.html.match(/[^{}]*(?=\})/g)

      if (result) {
        result = result.filter((item) => {
          if (item) {
            return item
          }
        })

        result = result.map((item) => {
          return item.trim()
        })

        console.log(result)

        let html = this.html

        // Replace placeholders with dynamic data
        for (const item of result) {
          const regEx = new RegExp(`{${item}}`, 'ig')

          const val = typeof this[item] === 'function' ? this[item]() : this[item]

          html = html.replace(regEx, val)
        }

        this.renderedHtml = html
        console.log(html)
      }
    }
  }

  render() {
    if (this.html) {
      this.generateActualHtml()
      this.rootDiv.innerHTML = this.renderedHtml
    }
  }
}

const app = new Vue({
  data: {
    firstName: 'Salim',
    lastName: 'Rana',
    date: new Date(1989, 3, 28, 12),
    sampleText: 'sss',
    onChangeAgeId: 'age-click',
    onInputId: 'type-input',
  },
  methods: {
    onChangeAge() {
      const input = document.getElementById('date') as HTMLInputElement

      if (input.value) {
        this.date = new Date(input.value)
      }
    },
    onInput(e) {
      const input = e.target
      this.sampleText = input.value
    },
  },
  computed: {
    getFullName(): string {
      return this.firstName + ' ' + this.lastName
    },
    getAge(): number {
      let age = 0

      const birthYear = this.date.getFullYear()
      const currentYear = new Date().getFullYear()

      age = currentYear - birthYear

      return age
    },
  },
  html: `<div>
    <p>My name is {getFullName}</p>
    <p>My age is {getAge}</p>
    <p>{sampleText}</p>
  </div>
  `,
}).mount('root') as any
