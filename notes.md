MVP:

- [ ] Brick game that keeps track of score
- [ ] Can save scores under a user (fetch - CREATE)
- [x] Can view scores of all the users (fetch - READ)


### Models:

#### Games
- score
- user_id

#### User
- name


### Associations

```ruby
Games

belongs_to :user

User

has_many :games

```


### Stretch goals
- [ ] increase speed every 5 paddle saves
- [ ] change ball color every paddle hit
- [ ] pause game
- [ ] move score off canvas
- [ ] increment score differently for different speed classes
