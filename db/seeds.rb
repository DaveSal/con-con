individual = Individual.create(first_name: 'John', last_name: 'Doe', phone_number: '996111111111', email: 'test@email.com', major: 'photographer', about: 'good man', password: 'Passw0rd', password_confirmation: 'Passw0rd')
corporate = Corporate.create(company_name: 'ОАО СТО', phone_number: '996222222222', email: 'test2@email.com', representer: 'Jane Doe', about: 'lalall', password: 'Passw0rd', password_confirmation: 'Passw0rd')
publication = Publication.create(title: 'Title', content: 'Content', price: 23, author_id: individual.id)
