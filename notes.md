MVP:

- [ ] Brick game that keeps track of score
- [ ] Can view the scores (fetch - READ)
- [ ] Can save scores under a user (fetch - CREATE)
- [ ] Can delete your score (fetch - DELETE)

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
